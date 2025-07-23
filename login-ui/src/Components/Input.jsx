function Input(props){
  console.log(props);
  return (

<div className="Login-input">

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

</div>

  );
}

export default Input;