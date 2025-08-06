import BlueLogo2 from '/src/CSS-Folder/Logo.module.css';
import BlueLogo from '/src/Logo/B-logo2.png';

function LogoComponent() {
  return (
    <img src={BlueLogo} alt="BlueLogo" className={BlueLogo2["BlueLogo2"]}/>
  );
}

export default LogoComponent;
