import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function BookDetail1({ bookId, onBack }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/opac/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) fetchBook();
  }, [bookId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!book) return <p className="text-center text-red-500">Book not found.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
      <button onClick={onBack} className="mb-4 text-blue-600 underline">
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            book.book_cover_img
              ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
              : `${import.meta.env.BASE_URL}images/placeholder-book.png`
          }
          alt={book.book_title}
          className="w-48 h-64 object-cover rounded shadow"
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
            Publisher: {book.book_publisher}
          </p>
          <p className="text-sm text-gray-500">
            Published: {book.book_year_publish?.slice(0, 10)}
          </p>
          <p className="text-sm text-gray-500">Status: {book.book_status}</p>
          <p className="text-sm text-gray-500">Views: {book.book_view_count}</p>
        </div>
      </div>
    </div>
  );
}
