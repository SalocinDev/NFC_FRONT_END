import { SearchBar, ImageSlider, BookDetailPage } from '../Components';
import classes from '../CSS/BookArchiveOpac.module.css';
import { useState, useEffect } from 'react';


function BookArchiveOpac() {
  const [selectedBookId, setSelectedBookId] = useState();
  const [active, setActive] = useState("DashBoard");

  const handleBack = () => setActive("DashBoard");

  const renderContent = () => {
    switch (active) {
      case "DashBoard":
        return (
          <ImageSlider
            setActive={setActive}
            setBookSelected={setSelectedBookId}
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

      default:
        return <ImageSlider setActive={setActive} setBookSelected={setSelectedBookId} />;
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
