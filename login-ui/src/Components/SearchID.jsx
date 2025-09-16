import classes from '../CSS-Folder/SearchID.module.css';

function SearchID({ type = "text", placeholder, name, id, value, onChange }) {
  return (
    <input
      className={classes.SearchByID}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default SearchID;
