import { useState } from 'react';
import classes from '/src/CSS-Folder/NfcPage.module.css';
import NfcLogo from '/src/Logo/NFC-logo.png';
import { Wlogo, Input, Blogo, Button} from '../Components';

function NfcPage() {
  const [SigningIn, IsSigningIn] = useState(false);

  const handleSignIn = () => {
    IsSigningIn(true);

    // Lagay ka condition dito nich
    setTimeout(() => {
      IsSigningIn(false);
    }, 3000);
  };

  return (
    
    <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          
            

          <div className={classes.tagline} >
            <img src={NfcLogo} alt="Logo" className={classes.NfcLogo} />
        
          {SigningIn && (
            <div className={classes.loadingContainer}>
              <div className={classes.spinner}></div>
              <p className={classes.signingText}>Signing in...</p>
            </div>
          )}
          
          {!SigningIn && (
            <Button name="SIGN-IN" use="NfcButtonSignIn" onClick={handleSignIn}>
              SIGN IN
            </Button>
          )}
        </div>
        </div>
        
        
        
      </div>
    </div>
  );
}

export default NfcPage;
