import { Button, Wlogo, Blogo, Input } from '../Components';
import classes from '/src/CSS-Folder/OtpForm.module.css';
import { useNavigate } from 'react-router-dom';

function OtpForm() {
  const navigate = useNavigate();
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
                <Input placeholder="OTP" />
                <Button name="VERIFY" use="ButtonVerify" onClick={() => handleLoginClick(navigate)} />
              </div>
      
        
      </div>
    
    </div>
  );
}

export default OtpForm;
