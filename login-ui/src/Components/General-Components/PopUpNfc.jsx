import classes from "../../CSS-Folder/PopUpNfc.module.css";

function PopUpNfc({ isOpen, onClose, initialValues }) {
  if (!isOpen || !initialValues) return null;

  // match your API keys
  const { 
    user_firstname, 
    user_lastname, 
    user_middlename, 
    ...rest 
  } = initialValues;

  return (
    <div className={classes.popup}>
      <div className={classes.popupContent}>

        {/* Header */}
        <div className={classes.popupHeader}>
          <h2>
            {user_lastname}, {user_firstname} {user_middlename}
          </h2>
          <div className={classes.popupActions}>
            <button>[Generate New NFC Token]</button>
            <button>[Instantiate NFC Card]</button>
          </div>
        </div>

        {/* Other details */}
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
