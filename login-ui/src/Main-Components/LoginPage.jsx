import classes from '../CSS-Folder/LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Button, Wlogo, Blogo, Input } from '../Components/index.js';
import { signIn } from '../Services/LoginService.js';
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");

  return (

      <div>

        <div className={classes.RightRectangle}>
          <div className={classes.RightContent}>

              <Wlogo />

            <div className={classes.SignUpContainer}>
              <p>New to our platform? Sign up now.</p>
              <Button name="SIGN UP" use="ButtonSignUp" onClick={() => navigate("/SignUpForm")}/>
            </div>

          </div>
        </div>
    
        <div className={classes.LoginContainer}>
      
        <div className={classes.Header}>

              <Blogo />
              <h1 className={classes.WelcomeHeader}>Welcome Back !!</h1>
              <p className={classes.Credentials}>Please Enter Your Credentials To Log-in</p>
        </div>

        <div className={classes.LoginInput}>

              <Input required type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
              <Input required type="password" placeholder="Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
          
        </div>
        
              <a href="#" className={classes.attribute}>
                Forgot password?
              </a>
              
              <Button name="SIGN-IN" use="ButtonSignIn" onClick={() => signIn(Email, Pass, navigate)} />

        <div className={classes.LineContainer}>
          <div className={`${classes.Line} ${classes.Left}`}></div>
            <span className={classes.Text}>or</span>
          <div className={`${classes.Line} ${classes.Right}`}></div>
        </div>

              <Button name="LOGIN WITH NFC" use="NfcSignIn" onClick={() => navigate("/NfcPage")}/>

      </div>
    
    </div>
  );
}

export default LoginPage;
