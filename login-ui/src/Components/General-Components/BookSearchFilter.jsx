//ths is hell this wont work sa malaking datasets
//bare minimum lng since kailangan irebuilt yung table which is ayaw ko

import React, { useState, useEffect } from "react";
import classes from "../../CSS-Folder/BookSearchFilter.module.css";
import api from "../../api/api";

function BookSearchFilter({ onApply }) {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data); // array of categories
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleApply = () => {
    onApply({
      searchText,
      status,
      category,
    });
  };

  const handleReset = () => {
    setSearchText("");
    setStatus("");
    setCategory("");
    onApply({ searchText: "", status: "", category: "" });
  };

  return (
    <div className={classes.MainBox}>
      <div className={classes.filterBox}>
        
      <div className={classes.field}>
        <label>Search</label>
        <input
          type="text"
          value={searchText}
          placeholder="Search book title / author..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className={classes.field}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <div className={classes.field}>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>

          {categories.map((cat) => (
            <option key={cat.book_category_id} value={cat.book_category_id}>
              {cat.book_category_name}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.buttons}>
        <button onClick={handleApply}>Apply</button>
        <button className={classes.reset} onClick={handleReset}>Reset</button>
      </div>
      </div>
    </div>
  );
}

export default BookSearchFilter;
