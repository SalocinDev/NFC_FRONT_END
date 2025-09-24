import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import classes from "../../CSS-Folder/UserGraph.module.css";
import {Button} from '..';  
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function UserGraph() {
  
  const monthlyData = {
    January: [
      { id: 0, value: 30, label: "Asim", color: "#017705ff" },
      { id: 1, value: 20, label: "UDM", color: "#2bff00ff" },
      { id: 2, value: 15, label: "PLM", color: "#2196f3" },
      { id: 3, value: 12, label: "PNU", color: "#c9aa22ff" },
      { id: 4, value: 18, label: "TUP", color: "#f44336" },
      { id: 5, value: 20, label: "Rando", color: "#00bcd4" },
    ],
    February: [
      { id: 0, value: 25, label: "Asim", color: "#017705ff" },
      { id: 1, value: 18, label: "UDM", color: "#2bff00ff" },
      { id: 2, value: 20, label: "PLM", color: "#2196f3" },
      { id: 3, value: 10, label: "PNU", color: "#e2d8a8ff" },
      { id: 4, value: 15, label: "TUP", color: "#f44336" },
      { id: 5, value: 22, label: "Rando", color: "#00bcd4" },
    ],
    March: [
      { id: 0, value: 28, label: "Asim", color: "#017705ff" },
      { id: 1, value: 22, label: "UDM", color: "#2bff00ff" },
      { id: 2, value: 18, label: "PLM", color: "#2196f3" },
      { id: 3, value: 14, label: "PNU", color: "#c9aa22ff" },
      { id: 4, value: 20, label: "TUP", color: "#f44336" },
      { id: 5, value: 19, label: "Rando", color: "#00bcd4" },
    ],
  };

  const months = Object.keys(monthlyData);
  const [currentMonthIndex, setCurrentMonthIndex] = React.useState(0);
  const currentMonth = months[currentMonthIndex];
  const pieData = monthlyData[currentMonth];

  
  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? months.length - 1 : prev - 1));
  };
  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === months.length - 1 ? 0 : prev + 1));
  };

  const downloadCSV = (filename, rows) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSliceClick = (event, item) => {
    if (event.type === "click") {
      const slice = pieData[item.dataIndex];
      if (slice) {
        downloadCSV(
          `${slice.label}-data.csv`,
          [["Role", "Count"], [slice.label, slice.value]]
        );
      }
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    const confirmDownload = window.confirm(
      "Gusto mo ba tlgang igadownload ang lahat ng laman nito?"
    );
    if (confirmDownload) {
      downloadCSV(
        `user-graph-data-${currentMonth}.csv`,
        [["Role", "Count"], ...pieData.map((d) => [d.label, d.value])]
      );
    }
  };

  return (
    <div className={classes.PieChartDesign} onContextMenu={handleRightClick}>
    
     <div className={classes.MonthNavigation}>
  <Button
    onClick={handlePrevMonth}
    use="arrowButton"           
    name={<AiOutlineLeft size={12} />}  
  />

  <span className={classes.MonthLabel}>{currentMonth}</span>

  <Button
    onClick={handleNextMonth}
    use="arrowButton"
    name={<AiOutlineRight size={12} />}
  />
</div>

      {/* Pie Chart */}
      <PieChart
        className={classes.PieChart}
        series={[
          {
            data: pieData,
            innerRadius: 135,
            outerRadius: 5,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 360,
            cx: 160,
            cy: 135,
            arcLabel: (item) => item.label,
          },
        ]}
        sx={{
          "& .MuiPieArc-root": {
            stroke: "#101540",
            strokeWidth: 2,
          },
          "& text": {
            fill: "#000000ff",
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
        onItemClick={handleSliceClick}
      />
    </div>
  );
}

export default UserGraph;
