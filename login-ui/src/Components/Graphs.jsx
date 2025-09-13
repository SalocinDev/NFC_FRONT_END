import {ServicesGraph, UserGraph, UserLoggedMonth } from '../Components';  
import classes from '../CSS-Folder/Graphs.module.css';


function Graphs() {
  return (
    <div>
      
      <div className={classes.BarGraphContainer}>
        <UserLoggedMonth/>
        <UserLoggedMonth/>
        <UserGraph/>       
        <ServicesGraph />  
      </div>
    </div>
  );
}

export default Graphs;

