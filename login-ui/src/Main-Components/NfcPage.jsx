import { useNavigate } from 'react-router-dom';
import { toNFClogin } from '../Services/LoginService';
import classes from '/src/CSS-Folder/NfcPage.module.css';
import NfcLogo from '/src/Logo/NFC-logo.png';
import { Button, LogoComponent} from '../Components';
import { useState, useEffect, useRef } from 'react';

function NfcPage() {
  const [SigningIn, IsSigningIn] = useState(false);
  const hasStartedRef = useRef(false); // only run once
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      handleSignIn();
    }
  }, []);

  const handleSignIn = async () => {
    IsSigningIn(true);

    const timeout = new Promise((resolve) => {
      setTimeout(() => resolve("Timeout"), 5000);
    });

    const result = await Promise.race([toNFClogin(), timeout]);
    sessionStorage.setItem("userInfo", JSON.stringify({
      username: result.data.name,
      role: result.data.role
    }));
    console.log(result);

    if (result === "Timeout") {
      alert("NFC login timed out. Returning to login.");
      navigate('/');
    } else if (result.success && result.data.role) {
      alert(`Welcome, ${result.data.role} (via NFC)!`);
      navigate("/AdminPage");
    } else if (result.success === false) {
      alert("NFC Login Failed. Returning to login.");
      navigate('/');
    } else if (result === "Error") {
      alert("An error occurred. Returning to login.");
      navigate('/');
    } else {
      alert("Unexpected response. Returning to login.");
      navigate('/');
    }

    IsSigningIn(false);
  };

  return (
    <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <div className={classes.tagline}>
            <img src={NfcLogo} alt="Logo" className={classes.NfcLogo} />

            {SigningIn && (
              <div className={classes.loadingContainer}>
                <div className={classes.spinner}></div>
                <p className={classes.signingText}>Signing in...</p>
              </div>
            )}
          </div>
          
        </div>
        
      </div>
            <div className={classes.Ewan}>
              <div className={classes.Logo}>
                
                <LogoComponent/>
                <p className={classes.Text}>
                  New to our platform? Sign Up now.
                </p>

              <div>        
                <Button name="SIGN UP" use="NfcSignUp" />  
              </div>

              </div>
            </div>
    </div>

    
  );
}

export default NfcPage;
