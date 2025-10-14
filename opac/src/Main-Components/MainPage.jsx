import {
  SearchBar,
  Button,
  BookArchive,
  OPACResult,
  OPACSearchbar,
  BookDetailPage,
} from "../Components";
import { AboutPage, BookArchiveOpac } from "../Main-Components";
import React, { useState } from "react";
import classes from "../CSS/MainPage.module.css";
import { IoMdInformationCircle, IoMdArrowBack } from "react-icons/io";


function MainPage() {
  const [active, setActive] = useState("SearchPage");
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [lastQuery, setLastQuery] = useState("");
  const [lastFilter, setLastFilter] = useState("keyword");

  //When search is submitted
  const handleSearch = (newQuery, newType) => {
    setLastQuery(newQuery);
    setLastFilter(newType);
    setActive("BookResult");
  };

  //When a book is clicked
  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    setActive("BookDetailPage");
  };

  // Back navigation
  const handleBack = () => {
    if (active === "BookDetailPage") setActive("BookResult");
    else setActive("SearchPage");
  };

  const renderContent = () => {
    switch (active) {
      case "SearchPage":
        return <OPACSearchbar onSearch={handleSearch} setActive={setActive} />;
      case "BookResult":
        return (
          <OPACResult
            query={lastQuery}
            type={lastFilter}
            onBookClick={handleBookClick}
            onBack={handleBack}
          />
        );
      case "BookDetailPage":
        return (
          <BookDetailPage
            bookId={selectedBookId}
            onBack={handleBack}
            setActive={setActive}
            setBookSelected={setSelectedBookId} 
          />
        );
      case "BookArchive":
        return <BookArchiveOpac setActive={setActive} />;
      case "AboutPage":
        return <AboutPage />;
      default:
        return <OPACSearchbar onSearch={handleSearch} setActive={setActive} />;
    }
  };

  console.log("ACTIVE PAGE:", active);

  return (
    <div>
      {/* Header */}
      <div className={classes.NavBar}>
        <div className={classes.HeaderNavBar}>
          <div className={classes.LogoGroup}>
            <span className={classes.ManilaAboveHeader}>MANILA</span>
            <span className={classes.LibraryAboveHeader}>
              City <br /> Library
            </span>
          </div>

          <div className={classes.SearchBar}>
  
  {active === "BookArchive" || active === "BookResult" || active === "BookDetailPage"? (
    <Button
      use="BackButtonOpac"
      name={
        <>
          <IoMdArrowBack size={30} />
          
        </>
      }
      onClick={handleBack}
    />
  ) : (
    
    active !== "SearchPage" && <SearchBar />
  )}


  {active === "AboutPage" ? (
    <Button
      use="AboutPage"
      name={
        <>
          <IoMdArrowBack size={20} />
          <span>BACK</span>
        </>
      }
      onClick={handleBack}
    />
  ) : (
    <Button
      use="AboutPage"
      name={
        <>
          <span>ABOUT US</span>
          <IoMdInformationCircle size={20} />
        </>
      }
      onClick={() => setActive("AboutPage")}
    />
  )}
</div>

        </div>
      </div>

      {/* Main Content */}
      <div className={classes.MainDiv}>
        <div className={classes.BookContainer}>
          <div className={classes.SampleLangTo}>
            <main className={classes.RenderComponents}>{renderContent()}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
