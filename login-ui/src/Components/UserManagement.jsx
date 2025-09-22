import classes from '../CSS-Folder/UserManagement.module.css';
import { Button, Table} from '../Components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



function UserManagement() {
  const navigate = useNavigate(); 
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [active, setActive] = useState("BorrowedBooks");
   
    
    const renderUserContent = () => {
      switch (active) {
        case "BorrowedBooks":
          return <Table />;
        case "ReturnedBooks":
          return <Table />;
        default:
          return <Table />;
      }
    };
   
    return (
      <div>
        <div className={classes.samplelang}>
            <Button name="User Table" use="BorrowedBooks" 
            onClick={() => setActive("BorrowedBooks")}
            isActive={active === "BorrowedBooks"} />
  
            <Button name="NFC-User Table" use="ReturnedBooks" 
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
export default UserManagement;

