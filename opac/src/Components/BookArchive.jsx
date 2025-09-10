import classes from '../CSS/BookArchive.module.css';
import { NavLink } from 'react-router-dom';

function BookArchive({ image, name, description }) {
  return (
    <NavLink>
    <div
      className={classes.Book}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={classes.Content}>
        <div className={classes.BookTitle}>{name}</div>
        <div className={classes.Des}>{description}</div>       
      </div>
    </div>
    </NavLink>
  );
}

export default BookArchive;


