import React, { useState, useEffect } from "react";
import { Button } from "../Components";
import { MdSaveAlt, MdOutlineAdd } from "react-icons/md";
import classes from '../CSS-Folder/ServiceForm.module.css';

function ServiceForm({ initialValues, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");

  // ONLY run when initialValues changes
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.library_service_name || "");
      setStatus(initialValues.library_service_status || "active");
    } else {
      // ADD mode → clear the form ONCE
      setName("");
      setStatus("active");
    }
  }, [initialValues]);

  const handleSubmit = () => {
    onSubmit({
      library_service_name: name,
      library_service_status: status,
    });
  };

  return (
    <div className={classes.PopupServices}>
      <h3>{initialValues ? "Edit Service" : "Add Service"}</h3>

      {/* HTML input prevents your issue 100% */}
      <input
        type="text"
        placeholder="Service Name"
        className="border rounded p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="border rounded p-2 w-full mt-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="active">active</option>
        <option value="inactive">inactive</option>
      </select>

      <div className={classes.ButtonContainer}>
        <Button
          use="CancelButton"
          name="Cancel"
          onClick={onCancel}
        />

        <Button
          onClick={handleSubmit}
          use="AddServiceButton"
          name={
            initialValues
              ? <>Save <MdSaveAlt /></>
              : <>Add <MdOutlineAdd /></>
          }
        />
      </div>
    </div>
  );
}

export default ServiceForm;
