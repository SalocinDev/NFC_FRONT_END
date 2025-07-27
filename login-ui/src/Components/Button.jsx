function Button(props) {
  const { name, use, onClick } = props;

  return (
    <button onClick={onClick} className={use}>
      {name}
    </button>
  );
}

export default Button;
