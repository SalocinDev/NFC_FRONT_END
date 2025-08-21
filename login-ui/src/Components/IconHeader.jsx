import classes from '/src/CSS-Folder/IconHeader.module.css';
import { NavLink } from 'react-router-dom';

function IconText({ icon: Icon, headerTop, headerBottom, to }) {
  return (
    
    <NavLink to={to} className={classes.card}>
      <div className={classes.iconContainer}>
        <div className={classes.iconWrapper}>
          <Icon className={classes.icon} />
        </div>
      </div>

      <h2 className={classes.header}>
        <span>{headerTop}</span>
        <span>{headerBottom}</span>
      </h2>
    </NavLink>
  );
}

export default IconText;
