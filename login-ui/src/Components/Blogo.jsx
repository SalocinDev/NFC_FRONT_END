import BlueLogo from '../CSS-Folder/Logo.module.css';
import BlogoImg from '../Logo/B-logo.svg';

function Blogo() {
  return (
    <img src={BlogoImg} alt="BlueLogo" className={BlueLogo["BlueLogo"]}/>
  );
}

export default Blogo;