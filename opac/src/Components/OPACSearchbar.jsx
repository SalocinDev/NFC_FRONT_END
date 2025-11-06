import React, { useState, useRef, useEffect } from "react";
import classes from '../CSS/OPACSearchbar.module.css';
import { Button } from '../Components';
import { IoMdSearch } from "react-icons/io";
import { PiBooksFill } from "react-icons/pi";
import { HiSortDescending } from "react-icons/hi";
import { FaUser, FaBook } from "react-icons/fa";

function OPACSearchBar({ setActive, onSearch }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("keyword");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ When user clicks Search button or presses Enter
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a search term!");
      return;
    }

    // send query and filter up to parent
    onSearch(query, filter);
    // move to results page
    setActive("BookResult");
  };

  const options = [
    { value: "keyword", label: "Keyword", icon: <HiSortDescending/> },
    { value: "title", label: "Title", icon: <FaBook /> },
    { value: "author", label: "Author", icon: <FaUser /> },
  ];

  // ✅ close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={classes.SearchContainer}>
      <div className={classes.HeaderContainer}>
        <span className={classes.ManilaAbove}>MANILA</span>
        <span className={classes.LibraryAbove}>
          City <br /> Library
        </span>
      </div>

      <form onSubmit={handleSearch} className={classes.FormBook}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={classes.SearchBar}
        />

        <div className={classes.ButtonContainer}>
          {/* 🔍 Search Button */}
          <Button
            use="SearchButton"
            name={
              <>
                <IoMdSearch size={25} />
                <span>Search</span>
              </>
            }
            type="submit"
          />

          {/* 📚 Browse Button */}
          <Button
            use="RandomButton"
            name={
              <>
                <PiBooksFill size={25} />
                <span>Browse for Books</span>
              </>
            }
            type="button"
            onClick={() => setActive("BookArchive")}
          />

          {/* ⚙️ Dropdown */}
          <div className={classes.CustomDropdown} ref={dropdownRef}>
            <button
              type="button"
              className={classes.DropdownButton}
              onClick={() => setOpen(!open)}
            >
              {options.find((o) => o.value === filter)?.icon}
            </button>

            {open && (
              <ul className={classes.DropdownList}>
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setFilter(option.value);
                      setOpen(false);
                    }}
                    className={classes.DropdownItem}
                  >
                    {option.icon} 
                    <span className={classes.HideLabelMobile}>{option.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default OPACSearchBar;
