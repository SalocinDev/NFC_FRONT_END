import classes from '../../CSS-Folder/UserDashboard.module.css';
import { IconHeader } from '..';
import { FaBookOpen, FaReply, FaHandPointer} from 'react-icons/fa';
/* import { logOut } from '../Services/SessionUtils'; */


function UserHomepage({ onChangePage }) {
    
  return (
   
    <div>
      <div className={classes.iconHeaderContainer} >

        <div onClick={() => onChangePage("BorrowedBooks")}>
        <IconHeader
          icon={FaBookOpen}
          headerTop="Your Borrowed"
          headerBottom="Book List"
        />
        </div>
        
        <div onClick={() => onChangePage("ReturnedBooks")}>
            <IconHeader
          icon={ FaReply }
          headerTop="Your Returned"
          headerBottom="Book List"
        />
        </div>

        <div onClick={() => onChangePage("BrowseBooks")}>
        <IconHeader
          icon={FaHandPointer}
          headerTop="Browse Available"
          headerBottom="Book Inventory"
        />
        </div>
       
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

export default UserHomepage;



