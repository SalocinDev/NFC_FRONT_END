import React, { useState, useEffect, useRef } from "react";
import classes from "../CSS-Folder/Checkbox.module.css";
import api from "../api/api"
const Checkbox = ({ onChange }) => {
  // const optionsLeft = ["Books", "Fiction", "Special Collection", "Library Orientation", "Periodicals", "Reading Buddy", "Tutorial(s)", "Use of Library Space"];
  // const optionsRight = ["Computer User", "Computer With Internet", "E-Books", "E-Gov User", "E-Resources", "Digital Literacy", "Wi-Fi User"];
  // const allOptions = [...optionsLeft, ...optionsRight];

  const effectRan = useRef(false);

  const [options, setOptions] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (option) => {
    setCheckedItems(prev => ({ ...prev, [option]: !prev[option] }));
  };

  useEffect(() => {
    if (effectRan.current) return;

    api.get("/services/other")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) setOptions(res.data);
      })
      // .finally(console.log(options))
    effectRan.current = true;
  },[])

  const handleSelectAll = () => {
    const allChecked = options.every(opt => checkedItems[opt["Service_Name"]]);
    const newState = {};
    options.forEach(opt => {
      newState[opt["Service_Name"]] = !allChecked;
    });
    setCheckedItems(newState);
  };

  const handleClearAll = () => {
    const newState = {};
    options.forEach(opt => {
      newState[opt["Service_Name"]] = false;
    });
    setCheckedItems(newState);
  };

  const isAllSelected = options.length > 0 && options.every(opt => checkedItems[opt["Service_Name"]]);

  useEffect(() => {
    if (onChange) {
      const selected = Object.keys(checkedItems).filter(key => checkedItems[key]);
      onChange(selected, "");
    }
  }, [checkedItems, onChange]);

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
        {/* <div className={classes.column}>
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
        </div> */}
        <div className={classes.column}>
          {options.map(option => (
            <label key={option.Service_Id} className={classes.checkbox}>
              <input
                type="checkbox"
                checked={!!checkedItems[option["Service_Name"]]}
                onChange={() => handleChange(option["Service_Name"])}
                className={classes.input}
              />
              <span className={classes.label}>{option["Service_Name"]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
