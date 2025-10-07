import { SearchBar, SearchResultList, Button, BookArchive, OPACResult, OPACSearchbar } from '../Components';
import { AboutPage, BookArchiveOpac } from '../Main-Components';
import Johnrey from '../Bookcovers/TheGreatGatsby.jpg';
import { FaArrowDown } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import classes from '../CSS/MainPage.module.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { fetchBooks } from '../Services/fetchBooks';
import { IoMdInformationCircle } from "react-icons/io";

function MainPage() {
  const [results, setResults] = useState([]);
  const [active, setActive] = useState("SearchPage");
  const [searchType, setSearchType] = useState("keyword");
  const [loading, setLoading] = useState(false);

  


  const handleSearch = async (query, filter) => {
    setLoading(true);
    try {
      const res = await fetchBooks({ q: query, type: filter });
      setResults(res);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
  switch (active) {
    case "SearchPage":
      return <OPACSearchbar setActive={ setActive } onSearch={handleSearch}/>;
    case "AboutPage":
      return <AboutPage />;
    case "BookResult":
        return <OPACResult initialResults={results} initialLoading={loading} />
    case "BookArchive":
      return <BookArchiveOpac setActive={ setActive } />;
    default:
      return <OPACSearchBar />;
  }
};

  return (
    <div>
        <div className={classes.NavBar}>
              <div className={classes.HeaderNavBar}>
                <div className={classes.LogoGroup}>
                <span className={classes.ManilaAboveHeader}>MANILA</span>
                <span className={classes.LibraryAboveHeader}>
                  City <br /> Library
                </span>
              </div>

              <div className={classes.SearchBar}>
                {active !== "SearchPage" && <SearchBar />}

                <Button 
                  use="AboutPage"
                  name={<><span>ABOUT US</span><IoMdInformationCircle size={20} /></>}
                  onClick={() => setActive("AboutPage")}
                />
              </div>

                </div>
              </div>
              
    <div className={classes.MainDiv}>
         <div className={classes.BookContainer}>
            <div className={classes.SampleLangTo}>
                <main className={classes.RenderComponents}>
                  {renderContent()}
                </main>
              </div>
          </div>
    </div>
  </div>
  );
}

export default MainPage;
