import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from '../CSS/OPACSearchbar.module.css';
import { Button } from '../Components';
import { IoMdSearch } from "react-icons/io";
import { PiBooksFill } from "react-icons/pi";
import { HiSortDescending } from "react-icons/hi";
import { FaUser, FaBook } from "react-icons/fa"; // optional icons for options

function OPACSearchBar({setActive, onSearch}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("keyword"); // default option
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

   const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Please enter a search term!");

    onSearch(query, filter);
    setActive("BookResult");
  };

  const options = [
    { value: "title", label: "Title", icon: <FaBook size={18} /> },
    { value: "author", label: "Author", icon: <FaUser size={18} /> },
  ];

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

      <form
        onSubmit={handleSearch}
        className={classes.FormBook}
      >
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={classes.SearchBar}
        />

        <div className={classes.ButtonContainer}>

          <Button
            use="SearchButton"
            name={<><IoMdSearch size={25} /><span>Search</span></>}
            type="submit"
          />

          <Button
            use="RandomButton"
            name={<><PiBooksFill size={25} /><span>Browse for Books</span></>}
            type="button"
            onClick={() => setActive("BookArchive")} 
          />

        <div className={classes.CustomDropdown} ref={dropdownRef}>
          <button
            type="button"
            className={classes.DropdownButton}
            onClick={() => setOpen(!open)}
          >
            {/* Render icon of selected filter */}
            {filter === "keyword" 
              ? <HiSortDescending size={24} /> 
              : options.find(o => o.value === filter)?.icon}
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
                  {option.icon} {option.label}
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
