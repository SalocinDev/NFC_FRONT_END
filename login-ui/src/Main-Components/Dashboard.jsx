import classes from '/src/CSS-Folder/Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { Wlogo, Input, Blogo, Button } from '../Components';

function Dashboard() {
  const navigate = useNavigate();
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
      <Button name="Back" use="BackButton" onClick={() => navigate("/")}/>

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
