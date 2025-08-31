import React, { useState} from 'react';
import classes from '../CSS/SearchBar.module.css';
import { FaSearch } from "react-icons/fa";

function SearchBar({ setResults }) {
  
    const [input, setInput] = useState("")
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            
            const results = json.filter((user) => {
                return ( 
                value && 
                user && 
                user.name && 
                user.name.toLowerCase().includes(value)
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
