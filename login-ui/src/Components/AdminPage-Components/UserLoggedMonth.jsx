import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ClassNames } from '@emotion/react';
import classes from '../../CSS-Folder/UserLoggedMonth.module.css';

function UserLoggedMonth() {
  return (
    <div className={classes.linechart}>
      
           <LineChart
      xAxis={[
        {
          scaleType: "point",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          tickLabelStyle: { fill: "white" },   // 👈 X-axis text
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fill: "white" },   // 👈 Y-axis text
        },
      ]}
      series={[
        {
          id: "sales",
          label: "Sales",
          data: [1, 5, 2, 6, 3, 9.3],
          color: "#ffffffff",
          showMark: true,
        },
        {
          id: "revenue",
          label: "Revenue",
          data: [6, 3, 7, 9.5, 4, 2],
          color: "#d32f2f",
        },
      ]}
    />

      
    </div>
  );
}

export default UserLoggedMonth;
