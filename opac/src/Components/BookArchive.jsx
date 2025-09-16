import classes from '../CSS/BookArchive.module.css';
import { NavLink } from 'react-router-dom';

function BookArchive({ image, name, description }) {
  return (
    <NavLink>
      <div className={classes.BookCard}>
        <img src={image} alt={name} className={classes.BookImage} />
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </NavLink>
  );
}

export default BookArchive;
