import * as React from 'react';
import classes from '../CSS-Folder/ServicesGraph.module.css';
import { BarChart } from '@mui/x-charts/BarChart';

function ServicesGraph() {
  return (
     <div className={classes.BarChart}>
      <BarChart
  xAxis={[
    { 
      data: ['Maasim', 'wala naliligo', 'Maasim parin'], 
      labelStyle: { fill: '#000000ff', fontSize: 14 },   // X axis labels
      tickLabelStyle: { fill: '#000000ff', fontSize: 12 }, // Tick labels
  
    }
  ]}
  series={[
    { data: [4, 3, 5], color: '#4E59C0' },
    { data: [1, 6, 3], color: '#FFFFFF' },
    { data: [2, 5, 6], color: '#D7DAF3' }
  ]}
  sx={{
    '.MuiChartsAxis-label': { fill: '#000000ff' },   // Axis title
    '.MuiChartsAxis-tickLabel': { fill: '#000000ff' } // Tick text
  }}
  className={classes.BarChartDesign}
/>
    </div>
  );
}

export default ServicesGraph;  