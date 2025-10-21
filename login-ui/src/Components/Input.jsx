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
  required = false, 
  label, 
}) {
  if (type === "select") {
    return (
      <div className={classes.inputContainer}>
        <select
          className={`${classes.input} ${className || ""}`}
          name={name}
          id={id}
          value={value || ""}
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
        {label && <label htmlFor={id} className={classes.inputLabel}>{label}</label>}
      </div>
    );
  }

  return (
    <div className={classes.inputContainer}>
      <input
        className={`${classes.input} ${className || ""}`}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
      />
      {label && <label htmlFor={id} className={classes.inputLabel}>{label}</label>}
    </div>
  );
}

export default Input;
