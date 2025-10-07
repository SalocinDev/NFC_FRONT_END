import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from '../CSS/OPACResult.module.css';
import api from "../api/api";

function OPACResult({ initialResults, initialLoading }) {
  const [results, setResults] = useState(initialResults || []);
  const [loading, setLoading] = useState(initialLoading || false);

  const location = useLocation();
  const navigate = useNavigate();
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
    <div className={classes.Main}>
    
      <form
        onSubmit={handleSearch}
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
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
        />

        <button
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div>
        <div>
          <label>
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
          <label>
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
          <label>
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
          <label>
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
        <p>Loading books...</p>
      ) : results.length === 0 ? (
        <p>
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
             {results.map((book) => (
        <div key={book.book_id} className="p-3 border rounded-lg">
          <img
            src={book.book_cover_img || "/placeholder-book.png"}
            alt={book.book_title}
            className="w-full h-48 object-cover rounded"
          />
          <h3>{book.book_title}</h3>
          <p>{book.book_author}</p>
        </div>
      ))}
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
