import classes from '/src/CSS-Folder/ChartLegend.module.css';
import { FaCircle } from 'react-icons/fa';

function ChartLegend() {
  return (
    <div className={classes['legend-container']}>
      <div className={classes['legend-item']}>
        
        <div className={classes['legend-row']}>
          <FaCircle color="#5272AA" size={15} /> Borrowed Books
        </div>
        
        <div className={classes['legend-row']}>
          <FaCircle color="#101540" size={15} /> Returned Books
        </div>

      </div>
    </div>
  );
}

export default ChartLegend;
