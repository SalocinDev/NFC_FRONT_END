function Button(props){
  console.log(props);
  const {name, use} = props;

  return (

    <button onClick={() => console.log('Testing')} className={use}>{props.name}</button>
  );
}

export default Button;