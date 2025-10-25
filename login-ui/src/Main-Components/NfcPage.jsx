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

    try {
      const timeout = new Promise((resolve) => {
        setTimeout(() => resolve("Timeout"), 5000);
      });

      const result = await Promise.race([toNFClogin(navigate), timeout]);
      // console.log(result);
      
      if (!result) {
        toast.error("No response received. Returning to login.");
        navigate('/');
        return;
      }

      if (result === "Timeout") {
        toast.error("NFC login timed out. Returning to login.");
        navigate('/');
        return;
      }

      if (!result.success) {
        toast.error("NFC Login Failed. Returning to login.");
        navigate('/');
        return;
      }

      if (result.success) {
        if (!result.reader_attached) {
          toast.error(result.message)
          navigate('/');
          return;
        }
        const welcomeMessage = `Welcome, ${result.user_firstname} (via NFC)!`;
        toast.success(welcomeMessage);

        if (result.alreadyLoggedIn) {
          navigate('/Intermediary', { state: { loggedIn: true } });
        } else {
          navigate('/Services', { state: { loggedIn: true } });
        }

        return;
      }

      console.warn("Unexpected response format:", result);
      toast.error("Unexpected response. Returning to login.");
      navigate('/');
    } catch (error) {
      console.error("Error during NFC login:", error);
      toast.error("Unexpected error. Returning to login.");
      navigate('/');
    } finally {
      IsSigningIn(false);
    }
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
