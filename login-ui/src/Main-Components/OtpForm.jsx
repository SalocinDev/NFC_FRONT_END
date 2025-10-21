import { useState, useEffect } from 'react';
import { Button, Wlogo, Blogo, Input } from '../Components';
import classes from '../CSS-Folder/OtpForm.module.css';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../Services/SignUpService';

function OtpForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [OTP, setOTP] = useState("");
  const { email, resetPass } = location.state || {};

  useEffect(() => {
    if (!email) {
      alert("No Email?");
      navigate("/");
      return;
    }

    const sendIfNeeded = async () => {
      if (resetPass) {
        const result = await sendOTP(email);
        if (!result.success) {
          alert("OTP sending Error");
        } else {
          alert(result.message);
        }
      }
    };
    sendIfNeeded();
  }, [email, resetPass, navigate]);

  return (
    <div className="App">
      <Button name="Back" use="BackButtonOtp" onClick={() => navigate("/")} />

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
          <div className={classes.inputContainer}>
          <Input
            required
            type="text"
            
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            label="OTP"
          />
          </div>
          <Button
            name="VERIFY"
            use="ButtonVerify"
            onClick={() => verifyOTP(email, OTP, navigate, resetPass)}
          />
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
