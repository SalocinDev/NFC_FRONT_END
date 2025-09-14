import { PieChart, Pie, Tooltip, Cell } from "recharts";
import classes from '../CSS-Folder/Chart.module.css';

function Chart({ borrowed, returned }) {
  const data = [
    { name: "Borrowed Books", value: borrowed },
    { name: "Returned Books", value: returned },
  ];

  const COLORS = ["#5272AA", "#101540"];

  return (
    <div className={classes.chartWrapper}>
      {/* ✅ Legend always on top */}
      <div className={classes.customLegend}>
        <div className={classes.legendItem}>
          <span className={classes.legendCircle} style={{ backgroundColor: COLORS[0] }}></span>
          <span>Borrowed Books</span>
        </div>
        <div className={classes.legendItem}>
          <span className={classes.legendCircle} style={{ backgroundColor: COLORS[1] }}></span>
          <span>Returned Books</span>
        </div>
      </div>

      <div className={classes.chartBox}>
        <PieChart width={190} height={190}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} books`, name]}
            contentStyle={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}
          />
        </PieChart>
      </div>
    </div>
  );
}

export default Chart;
