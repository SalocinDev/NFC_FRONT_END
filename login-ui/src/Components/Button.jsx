import classes from '../CSS-Folder/Button.module.css';

function Button(props) {
  const { name, use, onClick } = props;

  return (
    <button onClick={onClick} className={classes[use]}>
      {name}
    </button>
  );
}

export default Button;
