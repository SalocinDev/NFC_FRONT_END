import classes from '../CSS-Folder/Books.module.css';
import { Button, Table} from '../Components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
/* import { logOut } from '../Services/SessionUtils'; */


function Books() {
  const navigate = useNavigate(); 
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [active, setActive] = useState("BorrowedBooks");
     
      const renderUserContent = () => {
        switch (active) {
          case "BorrowedBooks":
            return <Table />;
          case "ReturnedBooks":
            return <Table />;
            case "Books":
            return <Table />;
          default:
            return <Table />;
        }
      };
     
      return (
        <div>
          <div className={classes.samplelang}>
              <Button name="Borrowed Books" use="BorrowedBooks" 
              onClick={() => setActive("BorrowedBooks")}
              isActive={active === "BorrowedBooks"} />

              <Button name="Books" use="Books" 
              onClick={() => setActive("Books")}
              isActive={active === "Books"} />

              <Button name="ReturnedBooks" use="ReturnedBooks" 
              onClick={() => setActive("ReturnedBooks")}
              isActive={active === "ReturnedBooks"} />
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

