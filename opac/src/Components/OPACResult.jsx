import React, { useEffect, useState } from "react";
import api from "../api/api";
import classes from "../CSS/OPACResult.module.css";
import { Button } from "../Components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

export default function OPACResult({ query, type, onBookClick, onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchType, setSearchType] = useState(type || "keyword");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

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
      setCurrentPage(1);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchData();
  }, [query, type]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchData();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className={classes.MainDiv}>

      <form onSubmit={handleSearch} className={classes.FormAuthor} id="SearchForm">
        <div className={classes.SearchFunction}>
          <Button
            type="submit"
            name={<IoIosSearch />}
            form="SearchForm"
            use="SearchButtonForm"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={classes.InputSearch}
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

      <div className={classes.FormDateContainer}>
        <div className={classes.FormDate}>
          <div className={classes.DateInput}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={classes.DateInputField}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={classes.DateInputField}
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
          <h1>We couldn't find any matches for that book.</h1>
          <h2>
            Try searching another term or if you have filters enabled, <br />
            try clearing them
          </h2>
        </div>
      ) : (
        <>
          <div className={classes.ImageCard}>
            {currentResults.map((b) => (
              <div
                key={b.book_id}
                onClick={() => onBookClick(b.book_id)}
                className={classes.ImageContainer}
              >
                <div className={classes.BookCover}>
                  <img
                    src={
                      b.book_cover_img
                        ? `${import.meta.env.VITE_API_URL}/${b.book_cover_img}`
                        : `${import.meta.env.BASE_URL}images/placeholder-book.png`
                    }
                    alt={b.book_title}
                    className={classes.BookCover}
                  />
                </div>

                <div className={classes.TextContainer}>
                  <h3>{b.book_title}</h3>
                  <p>{b.book_category || "Uncategorized"}</p>
                  <p>{b.book_author}</p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={classes.PaginationContainer}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={classes.PageButton}
              >
                Previous
              </button>

              <span className={classes.PageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={classes.PageButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
