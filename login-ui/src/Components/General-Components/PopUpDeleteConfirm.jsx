import { useState, useEffect } from "react";
import classes from "../../CSS-Folder/PopUpForm.module.css";
import { Button } from "..";

function PopUpFormDeleteConfirm({ 
  isOpen, 
  onClose, 
  onConfirm,
  selectedCount = 0 
}) {
  if (!isOpen) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        <div className={classes.FormContainer}>
          <form onSubmit={handleConfirm}>
            <div className={classes.inputGroup}>
              <h1>Confirm Deletion?</h1>
              <p>
                {selectedCount > 0
                  ? `You are about to delete ${selectedCount} record(s). This action cannot be undone.`
                  : "No records selected."}
              </p>
            </div>
            <div className={classes.buttonGroup}>
              <Button use="CloseForm" name="CANCEL" onClick={onClose} />
              <Button use="SaveForm" name="CONFIRM DELETE" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUpFormDeleteConfirm;
