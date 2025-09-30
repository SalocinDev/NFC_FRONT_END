import classes from "../../CSS-Folder/PopUpNfc.module.css";
import { FaNfcDirectional, FaNfcSymbol } from "react-icons/fa6";
import { Button } from '../../Components';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function PopUpNfc({ isOpen, onClose, initialValues }) {
  if (!isOpen || !initialValues) return null;

  const { 
    user_firstname, 
    user_lastname, 
    user_middlename, 
    ...rest 
  } = initialValues;

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
            onClick={() => toast.success("New Token Generated!")}  
            />

             <Button 
            use="InstantiateNfcButton"
            name={<><FaNfcSymbol size={24} />Write NFC</>} 
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
