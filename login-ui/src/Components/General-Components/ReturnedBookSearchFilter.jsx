import React, { useState } from "react";
import classes from "../../CSS-Folder/ReturnedBookSearchFilter.module.css";

function ReturnedBookSearchFilter({ onApply }) {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
  if (startDate && !endDate) {
    alert("Please select an end date.");
    return;
  }
  if (!startDate && endDate) {
    alert("Please select a start date.");
    return;
  }
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    alert("Start date cannot be later than end date.");
    return;
  }

  onApply({
    searchText,
    returnedStart: startDate,
    returnedEnd: endDate,
  });
};

const handleReset = () => {
  setSearchText("");
  setStartDate("");
  setEndDate("");

  onApply({
    searchText: "",
    returnedStart: "",
    returnedEnd: "",
  });
};

  return (
    <div className={classes.MainBox}>
      {/* Search */}
      <div className={classes.filterBox}>
      <div className={classes.field}>
        <label>Search (User / Book)</label>
        <input
          type="text"
          value={searchText}
          placeholder="Search returned records..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Returned Date Start */}
      <div className={classes.field}>
        <label>Returned Date (Start)</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* Returned Date End */}
      <div className={classes.field}>
        <label>Returned Date (End)</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className={classes.buttons}>
        <button onClick={handleApply}>Apply</button>
        <button className={classes.reset} onClick={handleReset}>Reset</button>
      </div>
      </div>
    </div>
  );
}

export default ReturnedBookSearchFilter;
