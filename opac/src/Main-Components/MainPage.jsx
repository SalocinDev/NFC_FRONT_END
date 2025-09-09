import { SearchBar, SearchResultList, Button, BookArchive } from '../Components';

import Johnrey from '../Bookcovers/TheGreatGatsby.jpg';
import { FaArrowDown } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import classes from '../CSS/MainPage.module.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { fetchBooks } from '../Services/fetchBooks'; 

function MainPage() {
  const [results, setResults] = useState([]);
  const parallaxRef = useRef(null);
  const [arrowClicked, setArrowClicked] = useState(false);

  const handleArrowClick = () => {
    setArrowClicked(true);
    if (parallaxRef.current) {
      setTimeout(() => {
        parallaxRef.current.scrollTo(1);
      }, 600); 
    }
  };

  /* WE NEED TO FETCH DATA FROM DB THAT WILL DISPLAY BOOK_TITLE, BOOK_AUTHOR AND BOOK_IMG */
  /* ATTEMPT FOR PLACEHOLDER: */
  /*  */
  
  return (
    <div className={classes.MainDiv}>
      <div
        className={`${classes.SearchContainer} ${
          arrowClicked ? classes.arrowActive : ''
        }`}
      >

        <div className={classes.HeaderContainer}>
          <span className={classes.ManilaAbove}>MANILA</span>
          <span className={classes.LibraryAbove}>
            City <br /> Library
          </span>
        </div>

      
        <div className={classes.SearchWrapper}>
          <SearchBar setResults={setResults} />
          {results.length > 0 && <SearchResultList results={results} />}
        </div>

        
        <div className={classes.ButtonContainer}>
          <Button name="SEARCH" use="SearchButton" />
          <Button name="RANDOM" use="RandomButton" />
        </div>
        
        {!arrowClicked && (
          <span className={classes.NextPage}>
            <Button
              name={<FaArrowDown />}
              use="ArrowButton"
              onClick={handleArrowClick}
            />
          </span>
        )}
      </div>

      
      <Parallax
        ref={parallaxRef}
        pages={3}
        style={{ top: 0, left: 0 }}
        className={classes.ParallaxPage}
      >
        
        <ParallaxLayer
          offset={1}
          speed={0.5}
          factor={1}
          className={classes.FirstLayer}
        >
          <div className={classes.JohnreyContainer}>
          <div className={classes.FirstLayerBook}>
            
<BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      <BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      <BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      
      <BookArchive
        image={Johnrey}
        name="The Great Gatsby"
      />
      </div>
      <div className={classes.FirstLayerBook}>

<BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      <BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      <BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      <BookArchive
        image={Johnrey}
        name="The Great Gatsby"
        description="A novel by F. Scott Fitzgerald."
      />
      </div>
      
</div>
      
        </ParallaxLayer>
      </Parallax>

    </div>
  );
}

export default MainPage;
