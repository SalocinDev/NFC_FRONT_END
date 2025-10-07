// /src/Components/OPACResult1.jsx
import React, { useState, useEffect } from "react";
import api from "../api/api";
import OPACSearch1 from "./OPACSearch1";

const OPACResult1 = ({ query, type, onBookClick, onBack, onNewSearch }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    startDate: "",
    endDate: "",
    sort: "title_asc",
  });
  const [loading, setLoading] = useState(false);

  // Load categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch results when query changes
  useEffect(() => {
    if (query) handleSearch(query, type);
  }, [query, type]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
      alert("Failed to load categories. Please check your server.");
    }
  };

  const handleSearch = async (searchQuery = query, searchType = type) => {
    if (!searchQuery.trim()) return alert("Please enter a search term.");

    // Validate start/end date logic
    if ((filters.startDate && !filters.endDate) || (!filters.startDate && filters.endDate)) {
      return alert("Please fill both start and end dates.");
    }
    if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      return alert("Start date cannot be later than end date.");
    }

    setLoading(true);
    try {
      const params = {
        q: searchQuery,
        type: searchType,
        category: filters.category,
        startDate: filters.startDate || "",
        endDate: filters.endDate || "",
        sort: filters.sort,
      };

      const res = await api.get("/search", { params });
      setBooks(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      startDate: "",
      endDate: "",
      sort: "title_asc",
    });
    handleSearch();
  };

  return (
    <div className="p-4">
      {/* 🔍 Search Bar (always visible) */}
      <div className="mb-4">
        <OPACSearch1 onSearch={onNewSearch} />
      </div>

      {/* 🧭 Filters */}
      <div className="flex flex-wrap gap-4 items-end bg-white shadow-sm p-3 rounded-lg">
        <div>
          <label className="block text-sm">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat.book_category_id} value={cat.book_category_id}>
                {cat.book_category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm">Sort</label>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="border rounded-md p-2"
          >
            <option value="title_asc">Title A–Z</option>
            <option value="title_desc">Title Z–A</option>
            <option value="author_asc">Author A–Z</option>
            <option value="author_desc">Author Z–A</option>
            <option value="views_high">Views (Highest)</option>
            <option value="views_low">Views (Lowest)</option>
            <option value="recent_oldest">Recent → Oldest</option>
            <option value="oldest_recent">Oldest → Recent</option>
          </select>
        </div>

        <button
          onClick={() => handleSearch()}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
        >
          Apply
        </button>

        <button
          onClick={handleResetFilters}
          className="bg-gray-300 hover:bg-gray-400 text-black rounded-md px-4 py-2"
        >
          Reset
        </button>

        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2"
        >
          ← Back
        </button>
      </div>

      {/* 📚 Results Section */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading books...</p>
        ) : books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.book_id}
              className="bg-white shadow-md rounded-lg p-3 cursor-pointer hover:shadow-lg transition"
              onClick={() => onBookClick(book.book_id)}
            >
              <img
                src={
                  book.cover_url
                    ? `${import.meta.env.VITE_API_URL}/${book.cover_url}`
                    : `${import.meta.env.BASE_URL}images/placeholder-book.png`
                }
                alt={book.title}
                className="w-24 h-32 object-cover mx-auto rounded mb-2"
              />
              <h3 className="font-semibold text-center text-sm truncate">{book.title}</h3>
              <p className="text-xs text-gray-600 text-center">{book.author}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default OPACResult1;
