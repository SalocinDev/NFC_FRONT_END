import { PieChart, Pie, Tooltip, Cell } from "recharts";
import classes from '/src/CSS-Folder/Chart.module.css';

function Chart({ borrowed, returned }) {
  const data = [
    { name: "Borrowed Books", value: borrowed },
    { name: "Returned Books", value: returned },
  ];

  const COLORS = ["#5272AA", "#101540"];

  return (
    <div className={classes.chartWrapper}>
      <PieChart width={650} height={650} className={classes.pieChart}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={280}
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
  );
}

export default Chart;
