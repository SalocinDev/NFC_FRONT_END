import classes from '../../CSS-Folder/Button.module.css';

function Button(props) {
  const { name, use, onClick, isActive } = props;

  return (
    <button
      onClick={onClick}
      className={`${classes[use]} ${isActive ? classes.active : ""}`}
    >
      {name}
    </button>
  );
}

export default Button;
