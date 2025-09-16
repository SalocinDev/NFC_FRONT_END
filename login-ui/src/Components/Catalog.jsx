import classes from '../CSS-Folder/Catalog.module.css';
import { Button, Table} from '../Components';
import { useNavigate } from 'react-router-dom';
/* import { logOut } from '../Services/SessionUtils'; */


function Catalog() {
  const navigate = useNavigate(); 
  const columns = ["ID", "User ID", "Amount", "Date", "Action"];
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
    
  const records = [
    { id: 1, userid: "U001", amount: "002 Books", date: "04-12-2024", action: "Olol nich" },
    { id: 2, userid: "U002", amount: "001 Books", date: "04-12-2024" },
    { id: 2, userid: "U002", amount: "003 Books", date: "04-12-2024" },
    { id: 2, userid: "U002", amount: "005 Books", date: "04-12-2024" },
    { id: 2, userid: "U002", amount: "003 Books", date: "04-12-2024" }
  ];

  return (
    <div>
      <div className={classes.samplelang}>
          <Button name="Borrowed Books" use="BorrowedBooks" /* onClick={() => {logOut().then(() => navigate('/BorrowedForm'));}} *//>
          <Button name="Returned Books" use="ReturnedBooks" /* onClick={() => {logOut().then(() => navigate('/BorrowedForm'));}} *//>
      </div>

      <div className={classes.TableContainer}>
        <Table columns={columns} records={records} />
      </div>
    </div>
  );
}

export default Catalog;

