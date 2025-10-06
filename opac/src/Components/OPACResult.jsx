import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

function OPACResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Filters
  const [sort, setSort] = useState("title_asc");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Search
  const queryParams = new URLSearchParams(location.search);
  const initialQ = queryParams.get("q") || "";
  const initialType = queryParams.get("type") || "keyword";
  const [query, setQuery] = useState(initialQ);
  const [type, setType] = useState(initialType);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch results
  useEffect(() => {
    if (!query.trim()) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await api.get("/opac/search", {
          params: { q: query, type, sort, category, startDate, endDate },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, type, sort, category, startDate, endDate]);

  // Go to details
  const handleBookClick = (bookId) => {
    navigate(`/BookDetail/${bookId}`);
  };

  // Refine search directly here
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Please enter a search term.");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* 🔹 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap justify-center items-center gap-3 bg-white shadow p-4 rounded-lg mb-6 sticky top-0 z-20"
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="keyword">Keyword</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="border flex-grow p-3 rounded-lg text-lg w-80"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="title_asc">Title (A–Z)</option>
            <option value="title_desc">Title (Z–A)</option>
            <option value="author_asc">Author (A–Z)</option>
            <option value="author_desc">Author (Z–A)</option>
            <option value="views_desc">Views (Highest → Lowest)</option>
            <option value="views_asc">Views (Lowest → Highest)</option>
            <option value="date_recent">Publication (Recent → Oldest)</option>
            <option value="date_oldest">Publication (Oldest → Recent)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.book_category_id} value={cat.book_category_id}>
                {cat.book_category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Publication From
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Publication To
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-red-500 text-lg font-semibold">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((book) => (
            <div
              key={book.book_id}
              onClick={() => handleBookClick(book.book_id)}
              className="p-3 border rounded-lg bg-white shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={
                  book.book_cover_img
                    ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img.replace(/^\/?uploads\//, "uploads/")}`
                    : `${import.meta.env.BASE_URL}images/placeholder-book.png`
                }
                alt={book.book_title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg truncate text-gray-900">
                {book.book_title}
              </h3>
              <p className="text-sm text-gray-600">{book.book_author}</p>
              <p className="text-xs text-gray-500 italic">
                {book.book_category || "Uncategorized"}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(book.book_year_publish).getFullYear()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OPACResult;
