import classes from '../../CSS-Folder/UserManagement.module.css';
import { Button, NfcUsers, Users} from '..';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



function UserManagement() {
  const navigate = useNavigate(); 
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [active, setActive] = useState("UserTable");
   
    
    const renderUserContent = () => {
      switch (active) {
        case "NfcUserTable":
          return <NfcUsers />;
        case "UserTable":
          return <Users />;
        default:
          return <Users />;
      }
    };
   
    return (
      <div>
        <div className={classes.samplelang}>
            <Button name="User Table" use="BorrowedBooks" 
            onClick={() => setActive("UserTable")}
            isActive={active === "UserTable"} />
  
            <Button name="NFC-User Table" use="ReturnedBooks" 
            onClick={() => setActive("NfcUserTable")}
            isActive={active === "NfcUserTable"} />
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

