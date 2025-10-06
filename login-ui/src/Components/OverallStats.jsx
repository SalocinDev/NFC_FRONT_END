//overall report for gender, caregory, and school. 
//jm ikaw na mag style
//palagay na lng sa report
import classes from "../CSS-Folder/OverallStats.module.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import { BarChart, PieChart } from "@mui/x-charts";

function OverallStats() {
  const [genderData, setGenderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [graphType, setGraphType] = useState("bar");

  useEffect(() => {
    api.get("/Statsreports/overall/gender").then((res) => setGenderData(res.data));
    api.get("/Statsreports/overall/category").then((res) => setCategoryData(res.data));
    api.get("/Statsreports/overall/school").then((res) => setSchoolData(res.data));
  }, []);

  const renderTable = (title, data) => {
    const total = data.reduce((sum, row) => sum + row.value, 0);

    return (
      <div className={classes.MainContainer}>
        
        <div className={classes.ChartContainer}>
        
          <BarChart
            xAxis={[{ 
              scaleType: "band", 
              data: data.map((r) => r.label), 
              position: 'bottom'
            }]}
            series={[{ data: data.map((r) => r.value), label: "Users" }]}
          
          width={Math.min(800, window.innerWidth * 0.9)} // responsive max width
          height={400}
            
          />

        </div>
        <div className={classes.TableContainer}>
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.label}</td>
                <td>{row.value}</td>
              </tr>
            ))}
            <tr >
              <td>GRAND TOTAL</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.MainRender}>
      <h1>Overall Reports</h1>

      {renderTable("Overall Gender Count", genderData)}
      {renderTable("Overall User Category Count", categoryData)}
      {renderTable("Overall User School Count", schoolData)}
    </div>
  );
}

export default OverallStats;
