import classes from '/src/CSS-Folder/App.module.css';
import { useNavigate } from 'react-router-dom';
import { Button, Wlogo, Blogo, Input } from '../Components';
import { handleLoginClick, handleNFCloginClick } from '../Services/LoginService.js';

function App() {
  const navigate = useNavigate();
  return (

        <div className='App'>

        <div className={classes.RightRectangle}>
          <div className={classes.RightContent}>
              <Wlogo />
            <div className={classes.SignUpContainer}>
              <p>New to our platform? Sign up now.</p>
              <Button name="SIGN UP" use="ButtonSignUp" />
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

          <Input placeholder="Username" name="username" id="username" />
          <Input type="password" placeholder="Password" name="password" id="password" />
          
        </div>

        <a href="#">Forgot password?</a>
        <Button name="SIGN-IN" use="ButtonSignIn" onClick={() => handleLoginClick(navigate)} />

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

export default App;
