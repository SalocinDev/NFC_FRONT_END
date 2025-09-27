import classes from '../../CSS-Folder/Button.module.css';

function Button(props) {
  const { name, use, onClick, isActive, disabled } = props; 

  return (
    <button
      onClick={onClick}
      disabled={disabled} 
      className={`${classes[use]} ${isActive ? classes.active : ""}`}
    >
      {name}
    </button>
  );
}

export default Button;
