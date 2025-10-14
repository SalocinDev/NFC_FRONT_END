import classes from "../../CSS-Folder/PopUpNfc.module.css";
import { FaNfcDirectional, FaNfcSymbol } from "react-icons/fa6";
import { Button } from '../../Components';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api/api";

function PopUpNfc({ isOpen, onClose, initialValues }) {
  if (!isOpen || !initialValues) return null;

  let { 
    user_id,
    user_firstname, 
    user_lastname, 
    user_middlename,
    nfc_token, 
    ...rest 
  } = initialValues;

  const handleGenerateNFCToken = async () => {
    try {
      const res = await api.post("/nfc/token", { user_id });
      const data = res.data;
      if (data.success) {
        nfc_token = data.nfc_token;
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
    try {
      const res = await api.post("/nfc/write", { token: nfc_token });
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
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PopUpNfc;
