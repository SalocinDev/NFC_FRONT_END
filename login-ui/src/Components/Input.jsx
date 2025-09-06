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
}) {
  if (type === "select") {
    return (
      <select
        className={`${classes.input} ${className || ""}`}
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
      className={`${classes.input} ${className || ""}`}
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
