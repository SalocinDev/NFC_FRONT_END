import classes from '../CSS-Folder/Allservices.module.css';
import { Button, SurveyReport, SurveyReportExport} from '.';
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

function AllSurvey() {

  /* Three different endpoint variables for each child */
  const [borrowedRecords, setBorrowedRecords] = useState([]);
  const [returnedRecords, setReturnedRecords] = useState([]);
  const [bookRecords, setBookRecords] = useState([]);

  const [active, setActive] = useState("SurveyReport");
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
      <div className={classes.ButtonContainer}>
        <Button 
          name="Survey Graph" use="GraphButton" 
          onClick={() => setActive("SurveyReport")}
          isActive={active === "SurveyReport"} 
        />

        <Button 
          name="Generate Report" use="GenerateButton" 
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
