// /src/Components/OPACSearch1.jsx
import React, { useState } from "react";

const OPACSearch1 = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("keyword");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSearch || typeof onSearch !== "function") return;
    onSearch(query, type);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-2 p-4 bg-white shadow-md rounded-md w-full"
    >
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="keyword">Keyword</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
      >
        Search
      </button>
    </form>
  );
};

export default OPACSearch1;
