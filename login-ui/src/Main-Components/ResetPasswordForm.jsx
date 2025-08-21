import classes from '/src/CSS-Folder/ResetPasswordForm.module.css';
import { useNavigate } from 'react-router-dom';
import { Wlogo, Input, Blogo, Button } from '../Components';

function ResetPasswordForm() {
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

      <h1 className={classes.title}>Reset Password</h1>
      <p className={classes.subtitle}>Please enter your new password</p>

       

      <Input placeholder="New Password" type='password'/>
      <Input placeholder="Confirm Password"  type='password' />
      <Button name="RESET PASSWORD" use="ButtonReset" />
      
      
    </div>

    </div>
    
  );
}

export default ResetPasswordForm;
