import BookCover from  "../Bookcovers/BookCover.png";
import BookCover1 from "../Bookcovers/BookCover1.png";
import BookCover2 from "../Bookcovers/BookCover2.png";
import BookCover3 from "../Bookcovers/BookCover3.png";
import BookCover4 from "../Bookcovers/BookCover4.png";
import BookCover5 from "../Bookcovers/BookCover5.png";
import BookCover6 from "../Bookcovers/BookCover6.png";
import BookCover7 from "../Bookcovers/BookCover7.png";

import BookArchive from "../Components/BookArchive";
import classes from '../CSS/BookArchiveList.module.css';

function BookArchiveList({ title = "Staff picks" }) {
  const placeholderBooks = [
    { id: 1, image: BookCover, name: "Book", description: "Description 1" },
    { id: 2, image: BookCover1, name: "Book 1", description: "Description 2" },
    { id: 3, image: BookCover2, name: "Book 2", description: "Description 3" },
    { id: 4, image: BookCover3, name: "Book 3", description: "Description 3" },
    { id: 5, image: BookCover4, name: "Book 4", description: "Description 3" },
    { id: 6, image: BookCover5, name: "Book 5", description: "Description 3" },
    { id: 7, image: BookCover6, name: "Book 6", description: "Description 3" },
    { id: 8, image: BookCover7, name: "Book 7", description: "Description 3" },
  ];

  return (
    <div className={classes.BookContainer}>
      <h2>
        {title}
      </h2>

      <div className={classes.BookGrid}>
        {placeholderBooks.map(book => (
          <BookArchive
            key={book.id}
            image={book.image}
            name={book.name}
            description={book.description}
          />
        ))}
      </div>
    </div>
  );
}

export default BookArchiveList;
