import classes from '../CSS/BookArchive.module.css';


function BookArchive({ image, name, description }) {
  return (
    <div
      className={classes.Book}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={classes.Content}>
        <div className={classes.BookTitle}>{name}</div>
        <div className={classes.Des}>{description}</div>       
      </div>
    </div>
  );
}

export default BookArchive;


