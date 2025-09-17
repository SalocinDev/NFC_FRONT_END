import classes from '../CSS-Folder/UserDashboard.module.css';
import { IconHeader } from '../Components';
import { FaUser, FaCog, FaBookOpen, FaReply, FaHandPointer} from 'react-icons/fa';
import { AiPopUp} from '../Components';
import { useNavigate } from 'react-router-dom';
import { AiFillAccountBook } from 'react-icons/ai';
/* import { logOut } from '../Services/SessionUtils'; */


function UserDashboard() {
    
    const borrowedBooks = 60;
    const returnedBooks = 40;

  return (
   
    <div className={classes.samplelang}>
      <div className={classes.iconHeaderContainer}>
        <IconHeader
          icon={FaBookOpen}
          headerTop="Your Borrowed"
          headerBottom="Book List"
          to="/BorrowedForm"
        /> 
    
         <IconHeader
          icon={ FaReply }
          headerTop="Your Returned"
          headerBottom="Book List"
        />

        <IconHeader
          icon={FaHandPointer}
          headerTop="Browse Available"
          headerBottom="Book Inventory"
        />
       
      </div>
        <div className={classes.ChartContainer}>
            <p className={classes.Paragraph}>
                "Embarking on the journey of reading fosters <br/>
                personal growth, nurturing a path <br/>
                towards excellence and the refinement of <br/>
                character."</p>
        </div>
      </div>

  );
}

export default UserDashboard;



