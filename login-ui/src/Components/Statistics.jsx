import { useState, useEffect } from 'react';
import classes from '../CSS-Folder/Statistics.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Charts, OverallStats, Button, SurveyFeedback, CountsOverview } from '../Components';

function Statistics() {
  const navigate = useNavigate(); 
  const [active, setActive] = useState("ServicesChart");
  
  const renderContent = () => {
    switch (active) {
      case "ServicesChart": return <Charts />;
      case "OverallStats": return <OverallStats />;
      case "SurveyFeedback": return <SurveyFeedback />;
      case "Counts": return <CountsOverview/>;
      default: return <Charts />;
    }
  };

  return (
    <div>
      <div className={classes.samplelang}>
        <Button 
          name="Services Usage" use="ServicesChart" 
          onClick={() => setActive("ServicesChart")}
          isActive={active === "ServicesChart"} 
        />

        <Button 
          name="Overall User" use="ReturnedBooks" 
          onClick={() => setActive("OverallStats")}
          isActive={active === "OverallStats"} 
        />

        <Button 
          name="Survey Feedback" use="SurveyFeedback" 
          onClick={() => setActive("SurveyFeedback")}
          isActive={active === "SurveyFeedback"} 
        />

        <Button 
          name="Overall Counts" use="CountButton" 
          onClick={() => setActive("Counts")}
          isActive={active === "Counts"} 
        />
      </div>

      <div className={classes.SampleLangTo}>
        <main className={classes.RenderComponents}>
          {renderContent()}
        </main>
      </div>     
    
    </div>
  );
}

export default Statistics;
