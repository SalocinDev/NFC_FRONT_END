import classes from '../../CSS-Folder/Books.module.css';
import { Button, PopUpForm, Table, PopUpFormDeleteConfirm } from '..';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import api from "../../api/api";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiBookAdd, BiSolidEditAlt } from "react-icons/bi";

function Books() {

  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [active, setActive] = useState("BorrowedBooksAdmin");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteConfim, setIsOpenDeleteConfirm] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [action, setAction] = useState(null);//what button is pressed (edit, add, delete)

  /* Three different endpoint variables for each child */
  const [borrowedRecords, setBorrowedRecords] = useState([]);
  const [returnedRecords, setReturnedRecords] = useState([]);
  const [bookRecords, setBookRecords] = useState([]);
  // const [loading, setLoading] = useState(true);

  /* For popup generate columns dynamically */
  const borrowedColumns = borrowedRecords.length > 0 ? Object.keys(borrowedRecords[0]) : [];
  const returnedColumns = returnedRecords.length > 0 ? Object.keys(returnedRecords[0]) : [];
  const bookColumns = bookRecords.length > 0 ? Object.keys(bookRecords[0]) : [];

  const fetchBorrowedBooks = async () => {
    try {
      const res = await api.get(`/borrowing/`);
      setBorrowedRecords(res.data);
    } catch (err) {
      console.error("Error fetching borrowed books:", err);
    }
  };

  const fetchReturnedBooks = async () => {
    try {
      const res = await api.get(`/returning/`);
      setReturnedRecords(res.data);
    } catch (err) {
      console.error("Error fetching returned books:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      
      const res = await api.get(`/books/?role=${storedUser.role}`);
      setBookRecords(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };
  

  // Initial fetch on mount
  useEffect(() => {
    fetchBorrowedBooks();
    fetchReturnedBooks();
    fetchBooks();
  }, []);

  // if (loading) return <p>Loading...</p>;

  // For rendering tables dynamically
  const renderUserContent = () => {
  switch (active) {
    case "BorrowedBooksAdmin":
      return (
        <Table
          key="BorrowedBooksAdmin"
          records={borrowedRecords}
          onSelectedRowsChange={setSelectedRows}
          checkbox
        />
      );
    case "ReturnedBooksAdmin":
      return (
        <Table
          key="ReturnedBooksAdmin"
          records={returnedRecords}
          onSelectedRowsChange={setSelectedRows} 
          checkbox
        />
      );
    case "BooksAdmin":
      return (
        <Table
          key="BooksAdmin"
          records={bookRecords}
          onSelectedRowsChange={setSelectedRows}
          checkbox
          hiddenColumns={["book_category_name", "book_img", "book_category_id"]}
        />
      );
    default:
      return <Table key="default"/>;
  }
};

  const handleFormSubmit = async( formValues, active, action) => {
    if (!formValues || !active || !action) {
      alert("What are you doing");
      return;
    }
    console.log("Form values: ", formValues);
    console.log("Active tab: ", active);
    console.log("Action taken: ", action);
    if (action === "add" && active === "BorrowedBooksAdmin") {
      const res = await api.post(`/borrowing/staff`, formValues);
      fetchBorrowedBooks();
      alert(res.data.message);
    }

    if (action === "add" && active === "BooksAdmin") {
      const res = await api.post(`/books/staff`, formValues);
      fetchBooks();
      alert(res.data.message);
    }

    if (action === "add" && active === "ReturnedBooksAdmin") {
      const res = await api.post(`/returning/staff`, formValues);
      fetchReturnedBooks();
      alert(res.data.message);
    }
    setIsOpen(false);
  };

  const handleDeleteConfirm = async () => {
    const selectedIndexes = Object.keys(selectedRows).filter(idx => selectedRows[idx]);

    console.log("Rows Selected: ", selectedRows);
    console.log("Active tab: ", active);
    console.log("Action taken: ", action);

    let tableData = [];
    let idField = null;

    //pick correct table + ID field depending on active tab
    if (active === "BorrowedBooksAdmin") {
      tableData = borrowedRecords;
      idField = "borrow_id";   //adjust field name from your backend
    } else if (active === "BooksAdmin") {
      tableData = bookRecords;
      idField = "book_id";     //adjust field name
    } else if (active === "ReturnedBooksAdmin") {
      tableData = returnedRecords;
      idField = "book_returned_id";
    } //adjust field name
    //map selected indexes to real IDs
    const selectedIds = selectedIndexes.map(idx => tableData[idx][idField]);
    console.log("Ids Selected: ", selectedIds);

    if (selectedIds.length === 0) {
      alert("No valid IDs found for deletion");
      return;
    }
    
    if (action === "delete" && active === "BorrowedBooksAdmin") {
      try {
        const res = await api.delete("/borrowing/staff", { data: selectedIds });
        fetchBorrowedBooks();
        alert(res.data.message);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete borrowed books");
      }
    }

    if (action === "delete" && active === "BooksAdmin") {
      try {
        const res = await api.delete("/books/staff", { data: selectedIds });
        fetchBooks();
        alert(res.data.message);
      } catch (err) {
        const books = err.response?.data?.books;
        if (books?.length) {
          const titles = books.map(b => `${b.book_title} (${b.book_author})`).join("\n");
          alert(`Cannot delete these borrowed books:\n${titles}`);
        } else {
          alert(err.response?.data?.message || "Failed to delete books");
        }
      }
    }

    if (action === "delete" && active === "ReturnedBooksAdmin") {
      try {
        const res = await api.delete("/returning/staff", { data: selectedIds });
        fetchReturnedBooks();
        alert(res.data.message);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete returned books");
      }
    }
    setIsOpenDeleteConfirm(false);
  };

  return (
    <div>
      <div className={classes.samplelang}>
        <Button 
        
          name="Borrowed Books" use="BorrowedBooks" 
          onClick={() => setActive("BorrowedBooksAdmin")}
          isActive={active === "BorrowedBooksAdmin"} 
        />

        <Button 
          name="Books" use="Books" 
          onClick={() => setActive("BooksAdmin")}
          isActive={active === "BooksAdmin"} 
        />

        <Button 
          name="ReturnedBooks" use="ReturnedBooks" 
          onClick={() => setActive("ReturnedBooksAdmin")}
          isActive={active === "ReturnedBooksAdmin"} 
        />

        <Button 
        name={<><BiSolidEditAlt  size={24} /></>} 
        use="EDAButton" 
        disabled={active === "BorrowedBooksAdmin"}
        onClick={() => {
          const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
            if (selectedIds.length === 0) {
              alert("Please select a row");
            return;
              }
              setAction("edit");
              setIsOpen(true);
            }}
        />

        <Button 
          name={<><BiBookAdd size={24}/></>} 
          use="EDAButton" 
          disabled={
            Object.keys(selectedRows).some(id => selectedRows[id]) || 
            [/* "BorrowedBooksAdmin", "ReturnedBooksAdmin"*/].includes(active)
          } 
          onClick={() => {
            setAction("add");
            setIsOpen(true);
          }}
        />

        <Button 
          name={<><MdOutlineDeleteOutline size={24} /></>} 
          use="DeleteButton"
          onClick={() => {
            const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
            if (selectedIds.length === 0) {
              alert("Please select a row to delete");
              return;
            }
            setAction("delete");
            setIsOpenDeleteConfirm(true);
          }}
        />

      </div>

      <div className={classes.TableContainer}>
        <main className={classes.RenderComponents}>
          {renderUserContent()}
        </main>
      </div>

      <PopUpForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        columns={
          active === "BorrowedBooksAdmin"
        ? borrowedColumns.slice(1)
        : active === "ReturnedBooksAdmin"
        ? returnedColumns.slice(1)
        : active === "BooksAdmin"
        ? bookColumns.slice(1)
        : []
      }
        initialValues={{}}
        onSubmit={(formValues) => handleFormSubmit(formValues, active, action)}
      />

      <PopUpFormDeleteConfirm
        isOpen={isOpenDeleteConfim}
        onClose={() => setIsOpenDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}

export default Books;
