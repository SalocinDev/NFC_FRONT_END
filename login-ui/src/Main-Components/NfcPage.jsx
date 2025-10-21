import { useNavigate } from 'react-router-dom';
import { toNFClogin } from '../Services/LoginService';
import classes from '../CSS-Folder/NfcPage.module.css';
import { NFCicon } from '../Logo';
import { Button, LogoComponent} from '../Components';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const result = await Promise.race([toNFClogin(navigate), timeout]);

    // sessionStorage.setItem("userInfo", JSON.stringify(result));
    if (!result) {
      toast.error("No response received. Returning to login.");
      navigate('/');
    } else if (result === "Timeout") {
      toast.error("NFC login timed out. Returning to login.");
      navigate('/');
    } if (result.success && !result.alreadyLoggedIn) {
      // First NFC login go to Services
      toast.success(`Welcome, ${result.user_firstname} (via NFC)!`);
      navigate("/Services", { state: { loggedIn: true } });
    } else if (result.success && result.alreadyLoggedIn) {
      // Already logged in
      toast.success(`Welcome, ${result.user_firstname} (via NFC)!`);
      navigate('/Intermediary', { state: { loggedIn: true } });
    } else if (result.valid === false) {
      toast.error("NFC Login Failed. Returning to login.");
      navigate('/');
    } else if (result.error) {
      toast.error(`An error occurred: ${result.error}`);
      navigate('/');
    } else {
      console.warn("Unexpected response format:", result);
      toast.error("Unexpected response. Returning to login.");
      navigate('/');
    }
    
    IsSigningIn(false);

  };

  return (
    <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <div className={classes.tagline}>
            <img src={NFCicon} alt="Logo" className={classes.NfcLogo} />

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
