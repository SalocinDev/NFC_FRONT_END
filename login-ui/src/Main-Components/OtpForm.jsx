import { useState } from 'react';
import { Button, Wlogo, Blogo, Input } from '../Components';
import classes from '../CSS-Folder/OtpForm.module.css';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../Services/SignUpService';
import { useSearchParams } from "react-router-dom";

function OtpForm() {
  const navigate = useNavigate();

  const [OTP, setOTP] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (

        <div className='App'>

        <div className={classes.RightRectangle}>
          <div className={classes.RightContent}>
              <Wlogo />
            <div className={classes.SignUpContainer}>
              <p className={classes.tagline}>
                          "Your premier digital library for borrowing and reading books"
              </p>
            </div>
          </div>
        </div>
    
        <div className={classes.LoginContainer}>
      <div className={classes.Header}>
                <Blogo />
                <h1 className={classes.WelcomeHeader}>CHECK YOUR MAILBOX</h1>
                <p className={classes.Credentials}>Please Enter the OTP to proceed</p>
              </div>
              <div>
                <Input required type="text" placeholder="OTP" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                <Button name="VERIFY" use="ButtonVerify" onClick={() => verifyOTP(email, OTP, navigate)} />
              </div>
      
        
      </div>
    
    </div>
  );
}

export default OtpForm;
