import bStyles from '../CSS/Button.module.css';

function Button(props) {
  const { name, use, onClick, type } = props;

  return (
    <button onClick={onClick} type={type} className={bStyles[use]}>
      {name}
    </button>
  );
}

export default Button;
