import React, { useState } from "react";
import { FaCommentMedical } from "react-icons/fa";
import classes from '../CSS/AiPopUp.module.css';

function AiPopUP() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.iconButton}
        onClick={() => setShowPopup((prev) => !prev)}
      >
        <FaCommentMedical size={24} color="#000" />
      </div>

    
      {showPopup && (
        <div className={classes.popup}>
          <h4>MCL AI</h4>
          <p></p>
          <input type="text" placeholder="Type something..." />
          <button onClick={() => alert("Submitted!")}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default AiPopUP;


