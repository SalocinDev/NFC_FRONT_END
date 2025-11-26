import React, { useState } from "react";
import classes from "../../CSS-Folder/BorrowedBookSearchFilter.module.css";

function BorrowedBookSearchFilter({ onApply }) {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [borrowedStart, setBorrowedStart] = useState("");
  const [borrowedEnd, setBorrowedEnd] = useState("");
  const [dueStart, setDueStart] = useState("");
  const [dueEnd, setDueEnd] = useState("");

  const handleApply = () => {
    // Validate borrowed date range
    if ((borrowedStart && !borrowedEnd) || (!borrowedStart && borrowedEnd)) {
      alert("Please fill in both Borrowed Start and End dates.");
      return;
    }
    if (borrowedStart && borrowedEnd && new Date(borrowedStart) > new Date(borrowedEnd)) {
      alert("Borrowed Start Date cannot be later than Borrowed End Date.");
      return;
    }

    // Validate due date range
    if ((dueStart && !dueEnd) || (!dueStart && dueEnd)) {
      alert("Please fill in both Due Start and End dates.");
      return;
    }
    if (dueStart && dueEnd && new Date(dueStart) > new Date(dueEnd)) {
      alert("Due Start Date cannot be later than Due End Date.");
      return;
    }

    // Apply filter if all validations pass
    onApply({
      searchText,
      status,
      startDate: borrowedStart,
      endDate: borrowedEnd,
      dueStart,
      dueEnd
    });
  };

  const handleReset = () => {
    setSearchText("");
    setStatus("");
    setBorrowedStart("");
    setBorrowedEnd("");
    setDueStart("");
    setDueEnd("");
    onApply({ searchText: "", status: "", startDate: "", endDate: "", dueStart: "", dueEnd: "" });
  };

  return (
    <div className={classes.MainBox}>
    <div className={classes.filterBox}>

      <div className={classes.division}>
      <div className={classes.field}>
        <label>Search</label>
        <input
          type="text"
          value={searchText}
          placeholder="Search by book, title, or user"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      
      <div className={classes.field}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
        </select>
      </div>
      </div>


      <div className={classes.division}>
      <div className={classes.field}>
        <label>Borrowed Date Start</label>
        <input type="date" value={borrowedStart} onChange={(e) => setBorrowedStart(e.target.value)} />
      </div>

      <div className={classes.field}>
        <label>Borrowed Date End</label>
        <input type="date" value={borrowedEnd} onChange={(e) => setBorrowedEnd(e.target.value)} />
      </div>
      </div>

      <div className={classes.division}>
      <div className={classes.field}>
        <label>Due Date Start</label>
        <input type="date" value={dueStart} onChange={(e) => setDueStart(e.target.value)} />
      </div>

      <div className={classes.field}>
        <label>Due Date End</label>
        <input type="date" value={dueEnd} onChange={(e) => setDueEnd(e.target.value)} />
      </div>
      </div>

      <div className={classes.buttons}>
        <button onClick={handleApply}>Apply</button>
        <button className={classes.reset} onClick={handleReset}>Reset</button>
      </div>
    </div>
    </div>
  );
}

export default BorrowedBookSearchFilter;
