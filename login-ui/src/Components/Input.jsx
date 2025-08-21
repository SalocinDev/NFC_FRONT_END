import classes from '../CSS-Folder/Input.module.css'; 

function Input({ type = "text", placeholder, name, id, value, onChange }) {
  return (
    <input
      className={classes.input}
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

export default Input;
