import classes from '../../CSS-Folder/Books.module.css';
import { Button, BorrowedBooksAdmin, ReturnedBooksAdmin, BooksAdmin} from '..';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
/* import { logOut } from '../Services/SessionUtils'; */


function Books() {
  const navigate = useNavigate(); 
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [active, setActive] = useState("BorrowedBooks");
     
      const renderUserContent = () => {
        switch (active) {
          case "BorrowedBooksAdmin":
            return <BorrowedBooksAdmin />;
          case "ReturnedBooksAdmin":
            return <ReturnedBooksAdmin />;
            case "BooksAdmin":
            return <BooksAdmin />;
          default:
            return <BorrowedBooksAdmin />;
        }
      };
     
      return (
        <div>
          <div className={classes.samplelang}>
              <Button name="Borrowed Books" use="BorrowedBooks" 
              onClick={() => setActive("BorrowedBooksAdmin")}
              isActive={active === "BorrowedBooksAdmin"} />

              <Button name="Books" use="Books" 
              onClick={() => setActive("BooksAdmin")}
              isActive={active === "BooksAdmin"} />

              <Button name="ReturnedBooks" use="ReturnedBooks" 
              onClick={() => setActive("ReturnedBooksAdmin")}
              isActive={active === "ReturnedBooksAdmin"} />
          </div>
    
          <div className={classes.TableContainer}>
              <main className={classes.RenderComponents}>
                  {renderUserContent()}
              </main>
          </div>
        </div>
      );
}

export default Books;

