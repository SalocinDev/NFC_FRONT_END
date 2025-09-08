import WhiteLogoSidebar from '../CSS-Folder/Logo.module.css';
import WlogoImg from '../Logo/W-logo.png'

function Wlogo() {

  return (
    <img src={WlogoImg} alt="WhiteLogo" className={WhiteLogoSidebar["WhiteLogoSidebar"]} />
  );
}

export default Wlogo;