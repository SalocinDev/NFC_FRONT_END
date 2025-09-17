import classes from '../CSS-Folder/ResetPasswordForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Wlogo, Input, Blogo, Button } from '../Components';
import { checkEmail } from '../Services/ChangePassword'

function ResetPasswordEmailCheck() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleCheckEmail = async () => {
    if (!email) {
      alert("Email missing");
      return;
    }
    
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        alert("Invalid Email");
        return;
    }

    navigate(`/OtpForm`, { state: { email, resetPass: true } });
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
      <p className={classes.subtitle}>Please enter your email</p>

      <Input placeholder='Enter Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button name="Verify Email" use="ButtonReset" onClick={handleCheckEmail} />
      
    </div>

    </div>
    
  );
}

export default ResetPasswordEmailCheck;
