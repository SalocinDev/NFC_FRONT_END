function Button(props){
  console.log(props);
  const {name} = props;

  return (

    <button onClick={() => console.log('Testing')} className='Button-sign-up'>{props.name}</button>
  );
}

export default Button;