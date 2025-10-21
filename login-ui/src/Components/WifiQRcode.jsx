// WifiQRCode.jsx
import React from "react";
import classes from '../CSS-Folder/WifiQRcode.module.css';
import { QRCodeCanvas } from "qrcode.react";

const WifiQRcode = ({ name, password, security = "WPA", size }) => {
  if (!name || !password) return null;

  // Standard Wi-Fi QR code format
  const qrValue = `WIFI:T:${security};S:${name};P:${password};;`;

  return (
    <div className={classes.QRCode}>
      <QRCodeCanvas value={qrValue} size={size} includeMargin={true} />
      <p >
        Scan to connect to: <strong>{name}</strong>
      </p>
    </div>
  );
};

export default WifiQRcode;
