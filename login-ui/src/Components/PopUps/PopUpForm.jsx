import { useState, useEffect } from "react";
import classes from "../../CSS-Folder/PopUpForm.module.css";
import { Button } from "..";
import { TiPin } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";

import api from "../../api/api";

function PopUpForm({ isOpen, onClose, columns = [], onSubmit, initialValues = {} }) {
  const [formData, setFormData] = useState(initialValues);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [bookCategories, setBookCategories] = useState([]);
  const [borrowingID, setBorrowingID] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialValues);
      setAvailableBooks([]);
      setAvailableUsers([]);
      setBookCategories([]);

      api.get("/books/available-books")
        .then((res) => {
          if (res.data.success) setAvailableBooks(res.data.data);
        })
        .catch((err) => console.error("Error loading available books", err));

      api.get("/user/available-users")
        .then((res) => {
          if (res.data.success) setAvailableUsers(res.data.data);
        })
        .catch((err) => console.error("Error loading available users", err));

      api.get("/books/book-categories")
        .then((res) => {
          if (res.data.success) setBookCategories(res.data.data);
        })
        .catch((err) => console.error("Error loading book categories", err));

      api.get("/borrowing/borrowing-id")
      .then((res) => {
        if (res.data.success) setBorrowingID(res.data.data);
      })
      .catch((err) => console.error("Error loading borrowed books", err));
    }
  }, [isOpen, initialValues]);


  if (!isOpen) return null;

  const handleChange = (e, col) => {
    setFormData({ ...formData, [col]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        <div className={classes.FormContainer}>
          <form onSubmit={handleSubmit}>
            
            {columns.map((col) => {
              const isDateField = col.toLowerCase().includes("date") || col.toLowerCase().includes("year");

              return (
                <div className={classes.inputGroup} key={col}>
                  <label>{col}</label>

                  {col === "book_id_fk" ? (
                    <select
                      
                      required
                      value={formData[col] || ""}
                      onChange={(e) => handleChange(e, col)}
                    >
                      <option value="">-- Select a Book --</option>
                      {availableBooks.map((book) => (
                        <option key={book.book_id} value={book.book_id}>
                          {book.book_title}
                        </option>
                      ))}
                    </select>
                  ) : col === "user_id_fk" ? (
                    <select
                      required
                      value={formData[col] || ""}
                      onChange={(e) => handleChange(e, col)}
                    >
                      <option value="">-- Select a User --</option>
                      {availableUsers.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.full_name}
                        </option>
                      ))}
                    </select>
                  ) : col === "book_category_id_fk" ? (
                    <select
                      required
                      value={formData[col] || ""}
                      onChange={(e) => handleChange(e, col)}
                    >
                      <option value="">-- Select Category --</option>
                      {bookCategories.map((category) => (
                        <option
                          key={category.book_category_id}
                          value={category.book_category_id}
                        >
                          {category.book_category_name}
                        </option>
                      ))}
                    </select>
                  ) : col === "borrow_id_fk" ? (

                    <select
                      required
                      value={formData[col] || ""}
                      onChange={(e) => handleChange(e, col)}
                      className={classes.SelectBorrowedBook}
                    >
                      <option value="">-- Select Borrowed Book --</option>
                      {borrowingID.map((borrow) => (
                        <option key={borrow.borrow_id} value={borrow.borrow_id}>
                          {borrow.book_title} (Borrowed by user: {borrow.full_name})
                        </option>
                      ))}
                    </select>
                  ) : isDateField ? (
                    <input
                      required
                      type="date"
                      value={formData[col] || ""}
                      onChange={(e) => handleChange(e, col)}
                    />
                  ) : (
                    <input
                      required
                      type="text"
                      value={formData[col] || ""}
                      onChange={(e) => handleChange(e, col)}
                    />
                  )}

                </div>
              );
            })}
          
            
              <Button use="CloseForm" 
              name={<><GrFormClose size={25} /><span>Close</span></>} 
              onClick={onClose} />
            
            
              <Button 
              use="SaveForm" 
              name={<><span>Save</span><TiPin size={25} color="red"/></>}  
              type="submit" />
            
      
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUpForm;
