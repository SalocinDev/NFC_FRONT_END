import { useState, useEffect } from "react";
import classes from "../../CSS-Folder/PopUpForm.module.css";
import { Button } from '..';

function GenerateTokenForm({ isOpen, onClose }) {
 
 useEffect(() => {
  if (isOpen) {
    setFormData(initialValues);
  }
}, [isOpen]); 

  if (!isOpen) return null;

return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        <div className={classes.FormContainer}>
          <p>Testing Pop Up</p>
          <span><Button use="CloseForm" name="CLOSE" onClick={onClose}/></span>
        </div>
      </div>
    </div>
  );
}

export default GenerateTokenForm;
