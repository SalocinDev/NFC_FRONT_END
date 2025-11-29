import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply, FaCommentMedical } from 'react-icons/fa';
import { Button, SearchID, BorrowedBooksTable, ReturnedBooksTable } from '..';
import { IconHeader } from '..';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '../../Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../Services/SessionUtils';
import classes from '../../CSS-Folder/BorrowedForm.module.css';

function BorrowedForm() {
  const [active, setActive] = useState("BorrowedBooks");
  const [searchTerm, setSearchTerm] = useState("");

  const renderTableContent = () => {
    switch (active) {
      case "BorrowedBooks":
        return <BorrowedBooksTable />;
      case "ReturnedBooks":
        return <ReturnedBooksTable />;
      default:
        return <BorrowedBooksTable />;
    }
  };

  return (
    <div>
      <div className={classes.ButtonContainer}>
        <Button
          name="Borrowed Books"
          use="BorrowedBooks"
          onClick={() => setActive("BorrowedBooks")}
          isActive={active === "BorrowedBooks"}   
        />
        <Button
          name="Returned Books"
          use="ReturnedBooksUser"
          onClick={() => setActive("ReturnedBooks")}
          isActive={active === "ReturnedBooks"}   
        />
        
        {/* <SearchID placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         /> */}
      </div>
      
      <div className={classes.TableContainer}>
        <main className={classes.RenderComponents}>
          {renderTableContent()}
        </main>
      </div>
    </div>
  );
}

export default BorrowedForm;
