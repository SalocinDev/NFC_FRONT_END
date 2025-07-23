function Input(props){
  console.log(props);
  return (

<div className="Login-input"  style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px' }}>

  <input
  type="text"
  id="username"
  name="username"
  placeholder="Username"
  required
/>

  <input
  type="text"
  id="password"
  name="password"
  placeholder="Password"
  required
/>

  <a href="#">Forgot password?</a>

  <button onClick={() => console.log('Testing')}>Sign-in</button>

</div>

  );
}

export default Input;