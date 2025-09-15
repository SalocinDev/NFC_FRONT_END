import { BookArchive, SearchBar, Button, BookArchiveList } from '../Components';
import React, { useState, useRef, useEffect } from 'react';
import classes from '../CSS/BookArchiveOpac.module.css';
import { fetchBooks } from '../Services/fetchBooks';
import { MdDashboard } from "react-icons/md";

function BookArchiveOpac({ image, name, description }) {
  
  return (

<div className={classes.MainBody}>
  <div className={classes.NavBar}>
      <div className={classes.HeaderNavBar}>
        <div className={classes.LogoGroup}>
        <span className={classes.ManilaAbove}>MANILA</span>
        <span className={classes.LibraryAbove}>
          City <br /> Library
        </span>
      </div>
      <div className={classes.SearchBar}>
        <SearchBar />
        
        
          </div>
        </div>
      </div>
      <div className={classes.BookContainer}>
            <BookArchiveList title="Staff Picks" /> 
      </div>
</div>

  );
}

export default BookArchiveOpac;
