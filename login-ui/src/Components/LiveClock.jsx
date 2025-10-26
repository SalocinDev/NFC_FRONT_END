import React, { useState, useEffect } from "react";
import classes from '../CSS-Folder/LiveClock.module.css';


function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className={classes.RightTopbar}>
        
      <span className={classes.Time}>{time}</span>
      <span className={classes.Date}>{date}</span>
      
      </div>
    </>
  );
}

export default LiveClock;
