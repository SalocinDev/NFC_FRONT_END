import logo from '/src/Logo/B-lugo.png';


function Logo(props){
  console.log(props);
  
  return (

<img src={logo} alt="Logo" />
    
  );
}

export default Logo;