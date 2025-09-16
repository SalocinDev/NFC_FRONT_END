import classes from '../CSS/SearchResultList.module.css';
import { SearchResult } from '../Components';

function SearchResultList({results}) {

  return (
    
      <div className={classes.ResultList}>
        {
            results.map((result, id) => {
                return <SearchResult result={result} key={id} />;
                
            })}
      </div>
    
  )
}

export default SearchResultList;
