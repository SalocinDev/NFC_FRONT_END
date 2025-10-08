import React, { useEffect, useState } from "react";
import api from "../api/api";
import classes from "../CSS/OPACResult.module.css";
import { Button } from "../Components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";


export default function OPACResult({ query, type, onBookClick, onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("relevance"); // default to relevance
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchType, setSearchType] = useState(type || "keyword");

  // Load categories on mount
  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  // Fetch books (on manual trigger)
  const fetchData = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await api.get("/opac/search", {
        params: {
          q: searchQuery,
          type: searchType,
          sort: sortBy,
          category,
          startDate,
          endDate,
        },
      });
      setResults(res.data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch — only when query is passed from searchbar
  useEffect(() => {
    if (query) fetchData();
  }, [query, type]);

  // Handle main search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Handle filter apply
  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className={classes.MainDiv}>
      <Button onClick={onBack} use="BackButton" name="Back"/>
       
      <div className={classes.FormContainer}></div>

      <form onSubmit={handleSearch} className={classes.FormAuthor} id="SearchForm">
        <div className={classes.SearchFunction}>
          <Button 
          type="submit" 
          name={<IoIosSearch />} 
          form="SearchForm" 
          use="SearchButtonForm"/>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="keyword">Keyword</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          
        </div>
      </form>
    <div/>

    <div className={classes.FormDateContainer}>
      <div className={classes.FormDate}>
        <div className={classes.DateInput}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className={classes.FilterFunction}>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="relevance">Relevance</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="author-asc">Author A–Z</option>
            <option value="author-desc">Author Z–A</option>
            <option value="views-asc">Views ↑</option>
            <option value="views-desc">Views ↓</option>
            <option value="pub-recent">Recent → Oldest</option>
            <option value="pub-oldest">Oldest → Recent</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.book_category_id} value={c.book_category_name}>
                {c.book_category_name}
              </option>
            ))}
          </select>

          <button
            onClick={handleApplyFilters}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
 
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <div className={classes.NoBookFound}>
          <p className={classes.MagnifyingIcon}><FaMagnifyingGlass /></p>
          <h1>
          We couldn't find any matches for that book.
          </h1>
          <h2>
            Try searching another term or if you have filters enabled, <br/>
            try clearing them
          </h2>
        </div>
      
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((b) => (
            <div
              key={b.book_id}
              onClick={() => onBookClick(b.book_id)}
              className="p-3 bg-white shadow rounded hover:shadow-md cursor-pointer"
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
              <h3 className="mt-2 font-semibold truncate">{b.book_title}</h3>
              <p className="text-sm text-gray-600">{b.book_author}</p>
              <p className="text-xs text-gray-500 italic">
                {b.book_category || "Uncategorized"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
