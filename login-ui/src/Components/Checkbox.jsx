import React, { useState, useEffect } from "react";
import classes from "../CSS-Folder/Checkbox.module.css";

const Checkbox = ({ onChange }) => {
  const optionsLeft = ["Books", "Fiction", "Special Collection", "Library Orientation", "Periodicals", "Reading Buddy", "Tutorial(s)", "Use of Library Space"];
  const optionsRight = ["Computer User", "Computer With Internet", "E-Books", "E-Gov User", "E-Resources", "Digital Literacy", "Wi-Fi User"];

  const allOptions = [...optionsLeft, ...optionsRight];

  const [checkedItems, setCheckedItems] = useState({});
  const [others, setOthers] = useState("");

  const handleChange = (option) => {
    setCheckedItems(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleSelectAll = () => {
  const allChecked = allOptions.every(opt => checkedItems[opt]);
  const newState = {};
  allOptions.forEach(opt => {
    newState[opt] = !allChecked;
  });
  setCheckedItems(newState);
};

const handleClearAll = () => {
  const newState = {};
  allOptions.forEach(opt => {
    newState[opt] = false;
  });
  setCheckedItems(newState);
};


  const isAllSelected = allOptions.every(opt => checkedItems[opt]);

  

  useEffect(() => {
    if (onChange) {
      const selected = Object.keys(checkedItems).filter(key => checkedItems[key]);
      onChange(selected, others);
    }
  }, [checkedItems, others, onChange]);

  return (
    <div className={classes.container}>
      <header className={classes.SelectButton}>       <div className={classes.SelectAllContainer}><label className={classes.switch}>
  <input
    type="checkbox"
    checked={isAllSelected}
    onChange={(e) => {
      if (e.target.checked) {
        handleSelectAll();
      } else {
        handleClearAll();
      }
    }}
  />
  <span className={classes.slider}></span>
  <span className={classes.SwitchLabel}>
    {isAllSelected ? "Unselect All" : "Select All"}
  </span>
</label></div>

</header>
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
        </div>
        

      </div>
    </div>
  );
};

export default Checkbox;
