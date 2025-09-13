import classes from '../CSS/UserManagement.module.css';
import { Button, Table} from '../Components';
import { useNavigate } from 'react-router-dom';
/* import { logOut } from '../Services/SessionUtils'; */


function UserManagement() {
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
          <h2>User Management</h2>
      </div>

      <div className={classes.TableContainerBooks}>
        <Table columns={columns} records={records} />
      </div>
    </div>
  );
}

export default UserManagement;

