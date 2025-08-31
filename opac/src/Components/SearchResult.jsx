import React from 'react'
import classes from '../CSS/SearchResult.module.css';

function SearchResult({result}) {
  
  return (
    <>
      <div className={classes.SearchResult} onClick={(e) => alert(`Gipindot mo ang book na ito: ${result.name}`)}>{result.name}</div> 
      {/*sa onlick mo ilalagay ngayon either yung popup or yung redirect page  */}
    </>
  )
}

export default SearchResult;
