import BlueLogo2 from '/src/CSS-Folder/Logo.module.css';
import BlueLogo from '/src/Logo/B-logo2.png';

function LogoComponent({ className }) {
  return (
    <img 
      src={BlueLogo} 
      alt="BlueLogo" 
      className={`${BlueLogo2["BlueLogo2"]} ${className || ""}`} 
    />
  );
}

export default LogoComponent;
