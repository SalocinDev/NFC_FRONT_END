import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function BookDetail({ bookId, onBack }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">Book not found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Results
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline flex items-center"
      >
        ← Back to Results
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Book Cover */}
        <div className="flex justify-center">
          <img
            src={
              book.book_cover_img
                ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
                : `${import.meta.env.BASE_URL}images/placeholder-book.png`
            }
            alt={book.book_title}
            className="w-64 h-80 object-cover rounded shadow"
          />
        </div>

        {/* Book Details */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-2xl font-bold">{book.book_title}</h2>
          <p className="text-gray-700">
            <strong>Author:</strong> {book.book_author}
          </p>
          <p className="text-gray-700">
            <strong>Publisher:</strong> {book.book_publisher}
          </p>
          <p className="text-gray-700">
            <strong>Year Published:</strong>{" "}
            {new Date(book.book_year_publish).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <strong>Category:</strong>{" "}
            {book.book_category_name || "Uncategorized"}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong> {book.book_status}
          </p>
          <p className="text-gray-700">
            <strong>Views:</strong> {book.book_view_count || 0}
          </p>

          <hr className="my-3" />

          <p className="text-gray-600 text-justify">
            {book.book_description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}
