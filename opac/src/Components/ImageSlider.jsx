import React, { useState, useEffect } from "react";
import { BookCoverDisplay } from '../Components';
import classes from "../CSS/ImageSlider.module.css";
import { Button } from '../Components';
import { GrFormPrevious, GrFormNext  } from "react-icons/gr";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../api/api.js";

function ImageSlider({ setActive, setBookSelected }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    api
      .get("/opac/top-viewed")
      .then((res) => {
        console.log("API Response:", res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error loading books:", err.response?.data || err.message);
        setError("Failed to load book list.");
      });
  }, []);

  return (
  <div>
    <main className={classes.SliderContainer}>
      {error && <p className={classes.error}>{error}</p>}

      <Swiper
  modules={[Navigation]}
  navigation={{
    nextEl: ".NextButton",
    prevEl: ".PreviousButton",
  }}
  onSwiper={(swiper) => setTotalSlides(swiper.slides.length)} // total slides count
  onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)} // active slide (1-based)
  effect={"coverflow"}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={"auto"}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  }}
  className={classes.SwiperContent}
>

        {books.map((book, index) => {
          const bgImage = book.book_cover_img
            ? `${import.meta.env.VITE_API_URL}/${book.book_cover_img}`
            : `${import.meta.env.BASE_URL}images/Fallback.png`

          return (
            <SwiperSlide key={book.book_id || index} className={classes.slide}>
              <div className={classes.info}>
                <div
                  className={classes.CoverTitle}
                  style={{ "--bg-image": `url(${bgImage})` }}
                >
                  <img
                    src={bgImage}
                    alt={book.book_title}
                    className={classes.bookImage}
                    onClick={() => {
                      setBookSelected(book.book_id);
                      setActive("BookDetailPage");
                    }}
                  />
                  <div className={classes.TitleContainer}>
                    <div className={classes.BookTitle}>
                      <h1>{book.book_title}</h1>
                    </div>
                    <p>
                      Categories:{" "}
                      {Array.from(
                        new Set(
                          (book.book_category || "")
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      ).join(" | ")}
                    </p>
                    <p>Views: {book.book_view_count}</p><br/>
                    <br/>
                    <br/>
                    <br/>
                    <p>Author: {book.book_author}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={classes.PaginationWrapper}>

        <div className={classes.PageIndicator}>
          <span>No. {currentIndex}</span>
        </div>
        
        <div className={`${classes.PreviousButton} PreviousButton`}>
          <Button 
        use="PreviousButtonSwiper"  
        name={<GrFormPrevious size={20} />} />
        </div>

        

        {/* <div className={`CustomPagination ${classes.CustomPagination}`}></div> */}
        
        <div className={`${classes.NextButton} NextButton`}>
          <Button 
        use="NextButtonSwiper"
        name={<GrFormNext size={20} />} />
        </div>
      </div>
    </main>
    <div>
      <BookCoverDisplay 
        title="Random Picks" 
        apiEndpoint="/opac/random" 
        slidesPerView={5}
        setActive={setActive}             //Now defined
        setBookSelected={setBookSelected} //Now defined
      />

      <BookCoverDisplay 
        title="Recently Added" 
        apiEndpoint="/opac/recent" 
        slidesPerView={5}
        setActive={setActive}             //Now defined
        setBookSelected={setBookSelected} //Now defined
      />
    </div>
  </div>
  );
}

export default ImageSlider;
