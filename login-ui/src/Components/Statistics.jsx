import { useState, useEffect } from 'react';
import classes from '../CSS-Folder/Statistics.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Charts, OverallStats, Button } from '../Components';

function Statistics() {
  const navigate = useNavigate(); 
  const [active, setActive] = useState("ServicesChart");
  
  const renderContent = () => {
    switch (active) {
      case "ServicesChart": return <Charts />;
      case "OverallStats": return <OverallStats />;
      default: return <Charts />;
    }
  };

  return (
    <div>
      <div className={classes.samplelang}>
        <Button 
          name="Services Usage" use="BorrowedBooks" 
          onClick={() => setActive("ServicesChart")}
          isActive={active === "ServicesChart"} 
        />

        <Button 
          name="Overall Usage" use="ReturnedBooks" 
          onClick={() => setActive("OverallStats")}
          isActive={active === "OverallStats"} 
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
