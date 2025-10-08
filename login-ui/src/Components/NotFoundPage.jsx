import {Link} from "react-router-dom";
import classes from '../CSS-Folder/NotFoundPage.module.css';
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Button } from '../Components';

function NotFoundPage() {
  const NotFoundPage = () => {
      
    }
  return (
    <div className={classes.NotFoundBackground}>
      <div className={classes.CenteredButton}>
      <Link to ={"/"}>
      
      <Button
        use="ErrorButton"
        name={
          <span className={classes.UnderlineGroup}>
            <IoReturnDownBackOutline size={35} />
            <span>Go Home</span>
          </span>
        }
        onClick={() => setActive("AboutPage")}
      />
      </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;