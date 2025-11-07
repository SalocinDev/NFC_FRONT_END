import React, { useState} from 'react';
import classes from '../CSS/SearchBar.module.css';
import { FaSearch } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

function SearchBar({ setResults }) {
  
    const [input, setInput] = useState("")
    const fetchData = (value) => {
        fetch(`${apiUrl}/books`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
        },
        })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            
            const results = json.filter((book) => {
                return ( 
                value && 
                book && 
                book.book_title && 
                book.book_title.toLowerCase().includes(value)
                );
            });

            setResults(results);
        });
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

  return (
  
    <div className={classes.InputWrapper}>
        <FaSearch id={classes.SearchIcon}/>
        <input 
        placeholder="Look for your favorite book." 
        className={classes.SearchInput} 
        value={input} 
        onChange={(e) => handleChange(e.target.value)} />
    </div>


  )
}

export default SearchBar;
