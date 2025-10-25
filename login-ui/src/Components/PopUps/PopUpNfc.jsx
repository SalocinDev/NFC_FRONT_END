import classes from "../../CSS-Folder/PopUpNfc.module.css";
import { FaNfcDirectional, FaNfcSymbol } from "react-icons/fa6";
import { Button } from '../../Components';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api/api";

import { useState, useEffect } from "react";

function PopUpNfc({ isOpen, onClose, initialValues }) {
  if (!isOpen || !initialValues) return null;

  const { 
    user_id,
    user_firstname, 
    user_lastname, 
    user_middlename,
    nfc_token: initialNfcToken, 
    ...rest 
  } = initialValues;

  const [nfcToken, setNfcToken] = useState(initialNfcToken || "");

  useEffect(() => {
    // Update token if initialValues change
    setNfcToken(initialNfcToken || "");
  }, [initialNfcToken]);

  const handleGenerateNFCToken = async () => {
    try {
      const res = await api.post("/nfc/token", { user_id });
      const data = res.data;
      if (data.success) {
        setNfcToken(data.nfc_token);
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.message || "Failed to generate token"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error generating NFC token");
    }
  };

  const handleIntiateNFCCard = async () => {
    if (!nfcToken) return toast.error("No NFC token generated");
    try {
      toast.info("Please wait, writing to NFC Card..")
      const res = await api.post("/nfc/write", { token: nfcToken });
      const data = res.data;
      if (data.success) {
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.message || "Failed to write NFC card"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error initiating NFC write");
    }
  };

  return (
    <div className={classes.popup}>
      <div className={classes.popupContent}>
        <div className={classes.popupHeader}>
          <h2>
            {user_lastname}, {user_firstname} {user_middlename}
          </h2>
          <div className={classes.popupActions}>
            <Button 
              use="GenerateNfcButton"
              name={<><FaNfcDirectional size={24} />Generate New</>}
              onClick={handleGenerateNFCToken}  
            />
            <Button 
              use="InstantiateNfcButton"
              name={<><FaNfcSymbol size={24} />Write NFC</>} 
              onClick={handleIntiateNFCCard}
            />
          </div>
        </div>

        <div className={classes.popupDetails}>
          {Object.entries(rest).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/^user_/, "")}:</strong> {String(value)}
            </p>
          ))}
          {nfcToken && (
            <p><strong>NFC Token:</strong> {nfcToken}</p>
          )}
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PopUpNfc;
