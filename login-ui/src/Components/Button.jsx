function Button(props){
  console.log(props);
  const {name} = props;

  return (
    <div>
      <button onClick={() => console.log('Testing')} class='Button-sign-up'>{props.name}</button>
      
    </div>
  );
}

export default Button;