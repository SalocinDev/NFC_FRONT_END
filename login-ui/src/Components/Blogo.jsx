import BlueLogo from '/src/CSS-Folder/Logo.module.css';
import BlogoImg from '/src/Logo/B-logo.png';

function Wlogo() {
  return (
    <img src={BlogoImg} alt="BlueLogo" className={BlueLogo["BlueLogo"]}/>
  );
}

export default Wlogo;