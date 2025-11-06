import classes from '../CSS-Folder/Books.module.css';
import { Button, SurveyReport, SurveyReportExport} from '.';
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

function AllSurvey() {


  const [active, setActive] = useState("SurveyReport");

  /* Three different endpoint variables for each child */
  const [borrowedRecords, setBorrowedRecords] = useState([]);
  const [returnedRecords, setReturnedRecords] = useState([]);
  const [bookRecords, setBookRecords] = useState([]);

  const renderUserContent = () => {
  switch (active) {
    case "SurveyReport":
      return (
        <SurveyReport
        />
      );
    case "SurveyExport":
      return (
        <SurveyReportExport
        />
      );
    
    default:
      return <SurveyReport key="default"/>;
  }
}; 

  return (
    <div>
      <div className={classes.samplelang}>
        <Button 
          name="Borrowed Books" use="BorrowedBooks" 
          onClick={() => setActive("SurveyReport")}
          isActive={active === "SurveyReport"} 
        />

        <Button 
          name="Returned Books" use="ReturnedBooks" 
          onClick={() => setActive("SurveyExport")}
          isActive={active === "SurveyExport"} 
        />

      </div>

      <div className={classes.TableContainer}>
        <main className={classes.RenderComponents}>
          {renderUserContent()}
        </main>
      </div>


    </div>
  );
}

export default AllSurvey;
