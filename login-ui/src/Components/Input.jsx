import classes from '../CSS-Folder/Input.module.css'; 

function Input({
  type = "text",
  placeholder,
  name,
  id,
  value,
  onChange,
  options = [],
  className,
  required = false, // make optional
}) {
  if (type === "select") {
    return (
      <select
        className={`${classes.input} ${className || ""}`}
        name={name}
        id={id}
        value={value !== undefined ? value : ""}
        onChange={onChange}
        required={required}
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
      className={`${classes.input} ${className || ""}`}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value !== undefined ? value : undefined}
      onChange={onChange}
      required={required}
    />
  );
}

export default Input;
