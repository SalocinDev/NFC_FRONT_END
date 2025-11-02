import classes from '../CSS-Folder/LoginPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Wlogo, Blogo, Input } from '../Components/index.js';
import { signIn } from '../Services/LoginService.js';
import { MdEmail, MdLock } from "react-icons/md";
import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const location = useLocation();
  const { loggedIn } = location.state || {};
  
  /* async function scanForNFC() {
    try {
      const res = await fetch(`${apiUrl}/nfc/read`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (!data.valid) {
        console.log("NFC SCAN NOT SUCCESSFUL");
        return;
      }
      console.log("NFC SCAN SUCCESSFUL");
      loginUsingNFC(data.token);
    } catch (error) {
      console.error("Error scanning NFC:", error);
    }
  }

  useEffect(() => {
    const interval = setInterval(scanForNFC, 2000);
    return () => clearInterval(interval);
  }, []);

  async function loginUsingNFC(token) {
    try {
      const res = await fetch(`${apiUrl}/acc/login-verify`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (!data.success) {
        alert("NFC TOKEN NOT RECOGNIZED");
        return;
      }
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      if (data.success) {
        alert(`Welcome, ${data.user_firstname} (via NFC)!`);
        navigate("/Intermediary");
      } else if (data.valid === false) {
        alert("NFC Login Failed. Returning to login.");
        navigate("/");
      } else if (data === "Error") {
        alert("An error occurred. Returning to login.");
        navigate("/");
      } else {
        console.warn("Unexpected response format:", data);
        alert("Unexpected response. Returning to login.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in with NFC:", error);
    }
  } */

  return (
      <div className={classes.LoginBody}>
         
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
      <form
        onSubmit={(e) => {
          e.preventDefault(); //prevents reload
          signIn(Email, Pass, navigate);
        }}
      >
        <div className={classes.LoginInput}>

        <div className={classes.inputContainer}>
          <div className={classes.inputWrapper}>
            <MdEmail className={classes.icon} size={30}/>
            <Input
              className={classes.EmailInput}
              required
              type="email"
              label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={classes.inputWrapper}>
            <MdLock className={classes.icon} size={30}/>
            <Input
             required
              type="password"
              label="Password"
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
              className={classes.PassInput}
            />  
          </div>
        </div>

          <div className={classes.mobileattribute}>
            <a
              className={classes.attributemobile}
              onClick={() => navigate("/ResetPasswordEmailCheck")}
            >
              Forgot password?
            </a>
            <a
              className={classes.attributemobile}
              onClick={() => navigate("/SignUpForm")}
            >
              Not a user yet?
            </a>
          </div>

          <Button
            name="SIGN-IN"
            use="ButtonSignInMobile"
            type="submit"
          />

          <Button
            name="LOGIN WITH NFC"
            use="NfcSignInMobile"
            onClick={() => navigate("/NfcPage")}
          />
        </div>
      </form>
        <div className={classes.ForgotPassContainer}>  
              
              <Button name="SIGN-IN" use="ButtonSignIn" onClick={() => signIn(Email, Pass, navigate)} />
        

        <div className={classes.LineContainer}>
          <div className={`${classes.Line} ${classes.Left}`}></div>
            <span className={classes.Text}>or</span>
          <div className={`${classes.Line} ${classes.Right}`}></div>
        </div>
              
              <Button name="LOGIN WITH NFC" use="NfcSignIn" onClick={() => navigate("/NfcPage")}/>
        </div>
      </div>
    
    </div>
  );
}

export default LoginPage;
