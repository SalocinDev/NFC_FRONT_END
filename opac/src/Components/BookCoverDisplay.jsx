import React, { useState, useEffect } from "react";
import classes from "../CSS/BookCoverDisplay.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import api from "../api/api.js";

function BookCoverDisplay({ title = "Random Books", apiEndpoint, slidesPerView = 4, setActive = { setActive }}) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiEndpoint) return;

    api
      .get(apiEndpoint)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error loading books:", err.response?.data || err.message);
        setError("Failed to load book list.");
      });
  }, [apiEndpoint]);

  return (
    <div className={classes.Container}>
      <h2 className={classes.SectionTitle}>{title}</h2>

      {error && <p className={classes.Error}>{error}</p>}

      {!books.length ? (
        <p className={classes.Empty}>No picks available</p>
      ) : (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={slidesPerView}
          spaceBetween={8}  
          loop={false}
          className={classes.MySwiper}
        >
          {books.map((book, index) => {
            const imgSrc = book.book_cover_img
              ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
              : `${import.meta.env.BASE_URL}images/Fallback.png`;

            return (
              <SwiperSlide key={book.book_id ?? index}>
                <div className={classes.BookCard}>
                  <div className={classes.ImageContainer}>
                    <img
                      src={imgSrc}
                      alt={book.book_title}
                      className={classes.BookImage}
                      onClick={() => setActive("Books")}
                    />
                  </div>
                  <div className={classes.BookInfo}>
                    <h3 className={classes.BookTitle}>
                      {book.book_title || "Untitled"}
                    </h3>
                    <p className={classes.BookAuthor}>
                      {book.book_author || "Unknown"}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default BookCoverDisplay;
