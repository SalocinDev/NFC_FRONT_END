function Button(props){
  console.log(props);
  const {name} = props;

  return (

    <button onClick={() => console.log('Testing')} class='Button-sign-up'>{props.name}</button>
  );
}

export default Button;