import React from "react";
import { Button, Input } from ".";
import WifiQRCode from "./WifiQRcode";
import classes from '../CSS-Folder/WifiModal.module.css';

const WifiModal = ({ wifi, onClose }) => {
  if (!wifi) return null;

  return (
    <div className={classes.PopUpModal}
      onClick={onClose} 
    >
      <div className={classes.PopUpBackground}
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 style={{ marginBottom: "15px" }}>{wifi.wifi_name}</h2>

        <p>
          <strong>Security:</strong> {wifi.wifi_security}
        </p>
        <p>
          <strong>Password:</strong> {wifi.wifi_password}
        </p>

        <div style={{ margin: "20px 0" }}>
        
          <WifiQRCode
            name={wifi.wifi_name}
            password={wifi.wifi_password}
            security={wifi.wifi_security}
            size={400}
          />
        </div>
        

        <Button
          onClick={onClose}
          name="Close"
          use="CloseFormQR"
        />
          
      </div>
    </div>
  );
};

export default WifiModal;
