import WhiteLogo from '/src/CSS-Folder/Logo.module.css';
import WlogoImg from '/src/Logo/W-logo2.png'

function Wlogo() {

  return (
    <img src={WlogoImg} alt="WhiteLogo" className={WhiteLogo["WhiteLogo"]} />
  );
}

export default Wlogo;