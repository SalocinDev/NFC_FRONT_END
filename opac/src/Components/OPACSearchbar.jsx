import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OPACSearchBar() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("keyword"); // default option
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter a search term!");
      return;
    }

    // Redirect to results page with query and filter
    navigate(`/OPACResult?q=${encodeURIComponent(query)}&filter=${filter}`);
  };

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gray-100">

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 w-full max-w-2xl bg-white shadow p-3 rounded-lg"
      >
        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="keyword">Keyword</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 flex-grow px-4 py-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default OPACSearchBar;
