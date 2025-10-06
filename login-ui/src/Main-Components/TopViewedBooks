import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function TopViewedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const res = await api.get("/opac/top-viewed");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching top viewed books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopBooks();
  }, []);

  if (loading) return <p>Loading top viewed books...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Top 10 Viewed Books</h2>
      {books.length === 0 ? (
        <p>No top viewed books available.</p>
      ) : (
        <div className="book-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
          {books.map((book) => (
            <div
              key={book.book_id}
              className="book-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                background: "#fff",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/BookDetail/${book.book_id}`)} //Go to Book Detail Page
            >
              <img
                src={
                  book.book_cover_img
                    ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
                    : `${import.meta.env.BASE_URL}images/placeholder-book.png`
                }
                alt={book.book_title}
                style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "6px" }}
              />
              <h4 style={{ marginTop: "10px", color: "#333" }}>{book.book_title}</h4>
              <p style={{ fontSize: "0.9em", color: "#555" }}>{book.book_author}</p>
              <p style={{ fontSize: "0.8em", color: "#888" }}>Views: {book.book_view_count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
