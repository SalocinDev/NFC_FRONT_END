import classes from '../CSS-Folder/Dashboard.module.css';
import { Wlogo, Input, Blogo, Button } from '../Components';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';
const apiUrl = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();
  const LogOut = async () => {
    await fetch(`${apiUrl}/logout`, {
      method: "POST",
      credentials: "include",
      "x-api-key": import.meta.env.VITE_API_KEY,
    });
    navigate("/"); // redirect after logout
  };
  return (

     <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <Wlogo />
          <p className={classes.tagline}>
            "Your premier digital library for borrowing and reading books"
          </p>
        </div>
      </div>

    <div className={classes.container}>
      <Button name="Log Out" use="BackButton" onClick={LogOut}/>


      <Blogo />

      <h1 className={classes.title}>Forgot Password</h1>
      <p className={classes.subtitle}>Please enter your username</p>

       

      <Input placeholder="Username" name="username" id="username" />
      <Button name="RESET PASSWORD" use="ButtonReset" />
      
      
    </div>

    </div>
    
  );
}

export default Dashboard;
