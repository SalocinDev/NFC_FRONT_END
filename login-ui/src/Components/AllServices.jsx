import classes from '../CSS-Folder/Allservices.module.css';
import { Button, SurveyReport, SurveyReportExport, ServiceManageTable, UserLibraryLog} from '.';
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

function AllServices() {


  /* Three different endpoint variables for each child */
  const [borrowedRecords, setBorrowedRecords] = useState([]);
  const [returnedRecords, setReturnedRecords] = useState([]);
  const [bookRecords, setBookRecords] = useState([]);

  const [active, setActive] = useState("SurveyReport");
  const renderUserContent = () => {
  switch (active) {
    case "SurveyReport":
      return (
        <ServiceManageTable
        />
      );
    case "SurveyExport":
      return (
        <UserLibraryLog
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
          name="Library Service" use="GraphButton" 
          onClick={() => setActive("SurveyReport")}
          isActive={active === "SurveyReport"} 
        />

        <Button 
          name="Library Logs" use="GenerateButton" 
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

export default AllServices;
