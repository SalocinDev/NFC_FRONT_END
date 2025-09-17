import { useNavigate } from 'react-router-dom';
import { toNFClogin } from '../Services/LoginService';
import classes from '../CSS-Folder/Intemediary.module.css';
import SurveyWhite from '../Logo/SurveyWhite.png';
import { Button, LogoComponent} from '../Components';
import { useState, useEffect, useRef } from 'react';

function NfcPage() {
  
     const navigate = useNavigate();

  return (
    <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <div className={classes.tagline}>
            <img src={SurveyWhite} alt="Logo" className={classes.NfcLogo} />
            
            <Button name="Services" use="ButtonServices" onClick={() => navigate("/Services")}/>
          </div>
          
        </div>
        
      </div>
            <div className={classes.Ewan}>
              <div className={classes.Logo}>
                
                <LogoComponent/>
                <p className={classes.Text}>
                  Navigate through your account.
                </p>

              <div>        
                <Button name="Account" use="ButtonUserPage" onClick={() => navigate("/UserPage")}/>
                  <Button
    name="Services"
    use="extraBtn"
    onClick={() => navigate("/Services")}
  />
              </div>

              </div>
            </div>
    </div>

    
  );
}

export default NfcPage;



           
            

            