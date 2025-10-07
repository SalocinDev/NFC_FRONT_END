import { SearchBar, ImageSlider, BookDetailPage } from '../Components';
import classes from '../CSS/BookArchiveOpac.module.css';
import { useState, useEffect } from 'react';


function BookArchiveOpac() {
  
  const [bookSelected, setBookSelected] = useState();
  const [active, setActive] = useState("DashBoard");

  const renderContent = () => {
  switch (active) {
    case "DashBoard":
      return <ImageSlider setActive={ setActive } setBookSelected={null} />;
    case "Books":
      return <BookDetailPage bookSelected={bookSelected} />;
    default:
      return <ImageSlider />;
  }
};

  return (

<div className={classes.MainBody}>
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
