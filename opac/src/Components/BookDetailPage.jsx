import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function BookDetailPage(bookSelected) {
  const id = bookSelected;
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    alert(id)
    if (!id || isNaN(id)) {
      console.error("Invalid or missing book ID");
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await api.get(`/opac/${id}`);
        setBook(res.data);

        // Increment views after successful load
        await api.post(`/opac/${id}/view`);

        // Fetch similar books (same category)
        if (res.data.book_category) {
          const similarRes = await api.get(
            `/opac/similar?category=${encodeURIComponent(
              res.data.book_category
            )}&exclude=${id}`
          );
          setSimilarBooks(similarRes.data);
        }
      } catch (err) {
        console.error("Error loading book:", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBookClick = (bookId) => {
    navigate(`/BookDetail/${bookId}`);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading book details...</p>
    );

  if (!book)
    return (
      <div className="text-center mt-10 text-red-500">
        Book not found.
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mx-auto"
        >
          ← Back
        </button>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      {/* Book Details */}
      <div className="max-w-3xl w-full bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={
              book.book_cover_img
                ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
                : `${import.meta.env.BASE_URL}images/placeholder-book.png`
            }
            alt={book.book_title}
            className="w-48 h-64 object-cover rounded shadow"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${import.meta.env.BASE_URL}images/placeholder-book.png`;
            }}
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {book.book_title}
            </h2>
            <p className="text-lg text-gray-700 mb-1">
              <strong>Author:</strong> {book.book_author}
            </p>
            <p className="text-gray-600 mb-2 italic">
              {book.book_category || "Uncategorized"}
            </p>
            <p className="text-gray-700 mb-3">{book.book_description}</p>
            <p className="text-sm text-gray-500">
              <strong>Publisher:</strong> {book.book_publisher}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Published:</strong>{" "}
              {book.book_year_publish
                ? new Date(book.book_year_publish).toLocaleDateString()
                : "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Status:</strong> {book.book_status}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Inventory:</strong> {book.book_inventory}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Views:</strong> {book.book_view_count}
            </p>
          </div>
        </div>
      </div>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <div className="mt-10 w-full max-w-5xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Similar Books in {book.book_category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarBooks.map((b) => (
              <div
                key={b.book_id}
                onClick={() => handleBookClick(b.book_id)}
                className="p-3 border rounded-lg bg-white shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={
                    b.book_cover_img
                      ? `${import.meta.env.VITE_API_URL}/${b.book_cover_img}`
                      : `${import.meta.env.BASE_URL}images/placeholder-book.png`
                  }
                  alt={b.book_title}
                  className="w-full h-48 object-cover rounded"
                />
                <h4 className="mt-2 font-semibold text-md truncate text-gray-900">
                  {b.book_title}
                </h4>
                <p className="text-sm text-gray-600">{b.book_author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetailPage;
