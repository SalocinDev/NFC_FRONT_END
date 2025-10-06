import { SearchBar, SearchResultList, Button, BookArchive } from '../Components';

import Johnrey from '../Bookcovers/TheGreatGatsby.jpg';
import { FaArrowDown } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import classes from '../CSS/MainPage.module.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { fetchBooks } from '../Services/fetchBooks'; 
import OPACSearchBar from '../Components/OPACSearchbar';

function MainPage() {
  const [results, setResults] = useState([]);
  
  return (

    <div className={classes.MainDiv}>
      <div className={classes.SearchContainer}>

        <div className={classes.HeaderContainer}>
          <span className={classes.ManilaAbove}>MANILA</span>
          <span className={classes.LibraryAbove}>
            City <br /> Library
          </span>
        </div>

        {/*}
        <div className={classes.SearchWrapper}>
          <SearchBar setResults={setResults} />
          {results.length > 0 && <SearchResultList results={results} />}
        </div>
        {*/}
        <>
          <OPACSearchBar/>
        </>

        <div className={classes.ButtonContainer}>
          <Button name="SEARCH" use="SearchButton" />
          <Button name="BROWSE BOOKS" use="RandomButton" />
        </div>     
      </div>
    </div>
     
  );
}

export default MainPage;
