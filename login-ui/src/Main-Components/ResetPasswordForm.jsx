import classes from '../CSS-Folder/ResetPasswordForm.module.css';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useState } from "react";
import { Wlogo, Input, Blogo, Button } from '../Components';
import { changePassword } from '../Services/ChangePassword'
import { RiRotateLockFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [Pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const { email } = location.state || {};

  if (!email) {
    toast.error("What are you doing here");
    return;
  }

  const handlePass = () => {
    if (!Pass || !ConfirmPass) {
      toast.warn("Input Password/s");
      return;
    }

    const minimumLength = 8;
    if (Pass.length < minimumLength || ConfirmPass.length < minimumLength) {
      toast.error(`Password must be at least ${minimumLength} characters long.`);
      return;
    }

    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (!complexityRegex.test(Pass)) {
      toast.warn("Password must have 1 uppercase, 1 lowercase, and 1 symbol.");
      return;
    }

    if (Pass !== ConfirmPass) {
      toast.error("Passwords do not match.");
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

    <div className={classes.inputContainer}>

    <div className={classes.inputWrapper}>
      <RiRotateLockFill className={classes.icon} size={30}/>
      <Input placeholder="New Password" type='password' value={Pass} onChange={(e) => setPass(e.target.value)} />
    </div>
    
    <div className={classes.inputWrapper}>
      <GiConfirmed className={classes.icon} size={30}/>
      <Input placeholder="Confirm Password"  type='password' value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
      </div>
      <Button name="RESET PASSWORD" use="ButtonReset" onClick={handlePass} />
      </div>
      
    </div>

    </div>
    
  );
}

export default ResetPasswordForm;
