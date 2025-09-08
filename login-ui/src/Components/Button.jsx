import bStyles from '../CSS-Folder/Button.module.css';

function Button(props) {
  const { name, use, onClick } = props;

  return (
    <button onClick={onClick} className={bStyles[use]}>
      {name}
    </button>
  );
}

export default Button;
