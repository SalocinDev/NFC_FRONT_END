import React, { useEffect, useState } from "react";
import api from "../api/api";
import { ClassNames } from "@emotion/react";
import classes from "../CSS/BookDetailPage.module.css";
import { BookCoverDisplay } from '../Components';

export default function BookDetail({ setActive, setBookSelected, bookId, onBack}) {
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    api
      .get("/opac/top-viewed")
      .then((res) => {
        //console.log("API Response:", res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error loading books:", err.response?.data || err.message);
        setError("Failed to load book list.");
      });
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/opac/book/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) fetchBook();
  }, [bookId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading book details...</p>;
  }

  if (!book) {
    return (
      <div>
        <p>Book not found.</p>
        <button
          onClick={onBack}
        >
          Back to Results
        </button>
      </div>
    );
  }

  
  return (
    <div>
      

      <div className={classes.BookDetailContainer}>
        <div className={classes.CoverInfoContainer}>

          <img
            src={
              book.book_cover_img
                ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
                : `${import.meta.env.BASE_URL}images/placeholder-book.png`
            }
            alt={book.book_title}
            className={classes.Image}
          />

        <div className={classes.InfoContainer}>
          
          <div className={classes.BookTitle}>
            <h1>{book.book_title}</h1>
          </div>
          <h2 className={classes.Author}>Author: {book.book_author}</h2><br/>

            <div className={classes.InfoRow}>
            <span className={classes.Label}>Publisher:</span>
            <span className={classes.Value}>{book.book_publisher || "N/A"}</span>
          </div>

          <div className={classes.InfoRow}>
            <span className={classes.Label}>Year Published:</span>
            <span className={classes.Value}>
              {new Date(book.book_year_publish).toLocaleDateString() || "N/A"}
            </span>
          </div>

          <div className={classes.InfoRow}>
            <span className={classes.Label}>Categories:</span>
            <span className={classes.Value}>
              {Array.from(
                new Set(
                  (book.book_category_name || "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              ).join(" | ") || "Uncategorized"}
            </span>
          </div>

          <div className={classes.InfoRow}>
            <span className={classes.Label}>Description:</span>
            <span className={classes.Value}>{book.book_description || "No description available."}</span>
          </div>          
          {/* 
           <p>
            
          <strong>Publisher:</strong> {book.book_publisher}
          <strong>Year Published:</strong>{" "}
            {new Date(book.book_year_publish).toLocaleDateString()}
          <strong>Category:</strong>{" "}
            {book.book_category_name || "Uncategorized"}
          <strong>Status:</strong> {book.book_status}
          <strong>Views:</strong> {book.book_view_count || 0}
          </p>

          <p>
            {book.book_description || "No description available."}
          </p> */}
          </div>
        </div>
        <div className={classes.ChooseBooks}>
        
      <BookCoverDisplay 
        title="Recently Added" 
        apiEndpoint="/opac/recent" 
        slidesPerView={7}
        setActive={setActive}             //Now defined
        setBookSelected={setBookSelected} //Now defined
        bookImageClass="SmallBook"
      />
      </div>
      </div>
    </div>
  );
}
