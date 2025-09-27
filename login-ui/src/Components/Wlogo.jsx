import WhiteLogo from '../CSS-Folder/Logo.module.css';
import WlogoImg from '../Logo/NW-logo2.svg'

function Wlogo() {

  return (
    <img src={WlogoImg} alt="WhiteLogo" className={WhiteLogo["WhiteLogo"]} />
  );
}

export default Wlogo;