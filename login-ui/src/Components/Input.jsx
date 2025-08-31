import classes from '../CSS-Folder/Input.module.css'; 

function Input({ type = "text", placeholder, name, id, value, onChange, options = [] }) {
  if (type === "select") {
    return (
      <select
        className={classes.input}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      className={classes.input}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value ?? ""}
      onChange={onChange}
      required
    />
  );
}

export default Input;
