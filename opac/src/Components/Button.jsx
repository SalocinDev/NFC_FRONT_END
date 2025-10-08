import bStyles from '../CSS/Button.module.css';

function Button(props) {
  const { name, use, onClick, type, form } = props;

  return (
    <button onClick={onClick} type={type} className={bStyles[use]} form={form}>
      {name}
    </button>
  );
}

export default Button;
