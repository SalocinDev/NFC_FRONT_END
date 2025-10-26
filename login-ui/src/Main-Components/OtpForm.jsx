import { useState, useEffect, useRef } from 'react';
import { Button, Wlogo, Blogo, Input } from '../Components';
import classes from '../CSS-Folder/OtpForm.module.css';
import { MdOutlinePassword  } from "react-icons/md";
import { useNavigate, useSearchParams, useLocation, redirect } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../Services/SignUpService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [OTP, setOTP] = useState("");
  const { email, resetPass } = location.state || {};

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    if (!email) {
      toast.error("No Email?");
      navigate("/");
      return;
    }

    const sendIfNeeded = async () => {
      if (effectRan) { return null }
      try {
        const result = await sendOTP(email);
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        if (result.success) {
          toast.success(result.message);
        }
        return;
      } catch (error) {
        toast.error("An error occured: "+ error.message || error)
      }
    };

    sendIfNeeded();
    effectRan.current = true;
  }, [email, resetPass, navigate]);

  const handleVerifyOTP = async () => {
    try {
      await verifyOTP(email, OTP, navigate);
      if (resetPass) {
        navigate("/ResetPasswordForm", { state: { success: true, email }});
        return;
      } else {
        toast.success("Email Verified!")
        navigate("/")
      }
    } catch (error) {
      toast.error("OTP verify error: "+ error.message || error)
    }
  }
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
            <div className={classes.inputWrapper}>
              <MdOutlinePassword  className={classes.icon} size={30} />   
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
            onClick={handleVerifyOTP}
          />
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
