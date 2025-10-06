import { SearchBar, ImageSlider, BookDetailPage } from '../Components';
import classes from '../CSS/BookArchiveOpac.module.css';
import { useState, useEffect } from 'react';


function BookArchiveOpac() {
  
   const [active, setActive] = useState("DashBoard");

   const renderContent = () => {
    switch (active) {
      case "DashBoard":
        return <ImageSlider setActive={ setActive }/>;
      case "Books":
        return <BookDetailPage />;
      default:
        return <ImageSlider />;
    }
  };

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
            <div className={classes.SampleLangTo}>
                <main className={classes.RenderComponents}>
                  {renderContent()}
                </main>
            </div>
      </div>
      
</div>

  );
}

export default BookArchiveOpac;
