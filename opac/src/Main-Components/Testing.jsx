import React, { useState, useEffect } from "react";


export default function Testing() 
{
const Product = ({ product }) => {
const [pageURL, setPageURL] = useState(0);
  useEffect(() => {
    setPageURL(window.location.href);
  })

  /* WE NEED TO FETCH DATA FROM DB THAT WILL DISPLAY BOOK_TITLE, BOOK_AUTHOR AND BOOK_IMG */
  /* ATTEMPT FOR PLACEHOLDER: */
  /*  */
  
  return (
    <div>
        <h3>{pageURL}</h3>
    </div>

  );
}}