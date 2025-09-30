import { useState } from "react";
import classes from '../../CSS-Folder/Button.module.css';

function Button(props) {
  const { name, use, onClick, isActive, disabled: propDisabled, cooldown = 0 } = props;
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    if (disabled || propDisabled) return; 

    if (onClick) onClick();

    if (cooldown > 0) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), cooldown);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || propDisabled} 
      className={`${classes[use]} ${isActive ? classes.active : ""} ${disabled ? classes.disabled : ""}`}
    >
      {name}
    </button>
  );
}

export default Button;
