import classes from '../CSS-Folder/ResetPasswordForm.module.css';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useState } from "react";
import { Wlogo, Input, Blogo, Button } from '../Components';
import { changePassword } from '../Services/ChangePassword'

function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [Pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const { email } = location.state || {};

  const handlePass = () => {
    if (!email) {
      alert("What are you doing here");
      return;
    }

    if (!Pass) {
      alert("Input Password");
      return;
    }

    if (!ConfirmPass) {
      alert("Input Password/s");
      return;
    }

    if (Pass.length < 6 || ConfirmPass.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (Pass !== ConfirmPass) {
      alert("Passwords are not the same");
      return;
    }

    changePassword(email,Pass,navigate);
  }
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

       

      <Input placeholder="New Password" type='password' value={Pass} onChange={(e) => setPass(e.target.value)} />
      <Input placeholder="Confirm Password"  type='password' value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
      <Button name="RESET PASSWORD" use="ButtonReset" onClick={handlePass} />
      
      
    </div>

    </div>
    
  );
}

export default ResetPasswordForm;
