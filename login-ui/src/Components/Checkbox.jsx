import React, { useState } from "react";
import classes from "../CSS-Folder/Checkbox.module.css";
import Button from "./Button"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const Checkbox = () => {
  const navigate = useNavigate();

  const optionsLeft = [
    "Books",
    "Fiction",
    "Special Collection",
    "Library Orientation",
    "Periodicals",
    "Reading Buddy",
    "Tutorial(s)",
    "Use of Library Space",
  ];

  const optionsRight = [
    "Computer User",
    "Computer With Internet",
    "E-Books",
    "E-Gov User",
    "E-Resources",
    "Digital Literacy",
    "Wi-Fi User",
  ];

  const [checkedItems, setCheckedItems] = useState({});
  const [others, setOthers] = useState("");

  const handleChange = (option) => {
    setCheckedItems((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className={classes.container}>
    
      <div className={classes.checkboxWrapper}>
        
        <div className={classes.column}>
          {optionsLeft.map((option) => (
            <label key={option} className={classes.checkbox}>
              <input
                type="checkbox"
                checked={!!checkedItems[option]}
                onChange={() => handleChange(option)}
                className={classes.input}
              />
              <span className={classes.label}>{option}</span>
            </label>
          ))}
        </div>

        
        <div className={classes.column}>
          {optionsRight.map((option) => (
            <label key={option} className={classes.checkbox}>
              <input
                type="checkbox"
                checked={!!checkedItems[option]}
                onChange={() => handleChange(option)}
                className={classes.input}
              />
              <span className={classes.label}>{option}</span>
            </label>
          ))}

         
          <div className={classes.others}>
            <label>
              Others:{" "}
              <input
                type="text"
                value={others}
                onChange={(e) => setOthers(e.target.value)}
                className={classes.inputText}
              />
            </label>
          </div>
        </div>
      </div>

      
      <div className={classes.buttonWrapper}>
        <Button
          name="SUBMIT"
          use="NfcSignIn"
          onClick={() => navigate("/NfcPage")} /* paralang makita na gumagana button, this aint supposed to be a navigate function. */
        />
      </div>
    </div>
  );
};

export default Checkbox;
