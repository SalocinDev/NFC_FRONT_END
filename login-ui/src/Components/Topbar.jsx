import classes from '/src/CSS-Folder/Topbar.module.css';
import { MdSettings } from 'react-icons/md';
import { useEffect, useState } from 'react';

function Topbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) =>
    time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className={classes.topbar}>
      <div className={classes.datetime}>
        <div className={classes.date}>{formatDate(currentTime)}</div>
        <div className={classes.time}>{formatTime(currentTime)}</div>
      </div>

      <div className={classes.userSection}>
        <span className={classes.user}>Admin</span>
        <MdSettings size={24} className={classes.settingsIcon} />
      </div>
    </div>
  );
}

export default Topbar;
