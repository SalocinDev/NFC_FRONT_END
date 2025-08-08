import classes from '/src/CSS-Folder/IconHeader.module.css';
import { NavLink } from 'react-router-dom';

function IconText({ icon: Icon, headerTop, headerBottom }) {
  return (
    <div className={classes.card}>


      <div className={classes.iconContainer}>
        <NavLink to="/dashboard" className={classes.card}>
        <div className={classes.iconWrapper}>
          <Icon className={classes.icon} />
        </div>
        </NavLink>
      </div>

      <h2 className={classes.header}>
        <span>{headerTop}</span>
        <span>{headerBottom}</span>
      </h2>
      
    </div>
  );
}

export default IconText;


