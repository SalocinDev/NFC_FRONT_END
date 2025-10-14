import React, { useState, useEffect, useCallback } from "react";
import classes from "../CSS-Folder/Checkbox.module.css";

const Checkbox = ({ onChange }) => {
  const optionsLeft = ["Books", "Fiction", "Special Collection", "Library Orientation", "Periodicals", "Reading Buddy", "Tutorial(s)", "Use of Library Space"];
  const optionsRight = ["Computer User", "Computer With Internet", "E-Books", "E-Gov User", "E-Resources", "Digital Literacy", "Wi-Fi User"];

  const [checkedItems, setCheckedItems] = useState({});
  const [others, setOthers] = useState("");

  const handleChange = (option) => {
    setCheckedItems(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleOthersChange = (e) => {
    setOthers(e.target.value);
  };

  // call onChange safely after state updates
  useEffect(() => {
    if (onChange) {
      const selected = Object.keys(checkedItems).filter(key => checkedItems[key]);
      onChange(selected, others);
    }
  }, [checkedItems, others, onChange]);

  return (
    <div className={classes.container}>
      <div className={classes.checkboxWrapper}>
        <div className={classes.column}>
          {optionsLeft.map(option => (
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
          {optionsRight.map(option => (
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
            </label>
            <input
                type="text"
                value={others}
                onChange={handleOthersChange}
                className={classes.inputText}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
