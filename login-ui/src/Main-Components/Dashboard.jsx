import classes from '/src/CSS-Folder/Dashboard.module.css';
import { Wlogo, Input, Blogo, Button } from '../Components';

function Dashboard() {
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
      <button className={classes.backButton} onClick={() => navigate(-1)}>BACK</button>

      <Blogo />

      <h1 className={classes.title}>Forgot Password</h1>
      <p className={classes.subtitle}>Please enter your username</p>

      <Input placeholder="Username" name="username" id="username" />
      <Button name="Reset Password" use="ResetButton" />

    </div>

    </div>
    
  );
}

export default Dashboard;
