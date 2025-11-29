import classes from '../../CSS-Folder/UserDashboard.module.css';
import { IconHeader } from '..';
import { FaUser, FaCog, FaBookOpen, FaReply, FaHandPointer} from 'react-icons/fa';
import { BorrowedBooksTable, ReturnedBooksTable, UserHomePage } from '..';
import { AiPopUp} from '..';
import { AiFillAccountBook } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

/* import { logOut } from '../Services/SessionUtils'; */
import { useState, useEffect } from 'react';

function UserDashboard() {

    const [active, setActive] = useState("HomePage");

    const renderTableContent = () => {
    switch (active) {
      case "HomePage":
        return <UserHomePage onChangePage={setActive}/>;
      case "BorrowedBooks":
        return <BorrowedBooksTable />;
      case "ReturnedBooks":
        return <ReturnedBooksTable/>;
      case "BrowseBooks":
        window.location.assign("http://manila.city.library:5001/NFC_FRONT_END/opac/");
        return null;
      default:
        return <UserHomePage />;
    }
  };

  return (
   
    <div className={classes.MainRender}>
      <main className={classes.RenderComponents}>
          {renderTableContent()}
      </main>
    </div>

  );
}

export default UserDashboard;



