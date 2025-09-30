//overall report for gender, caregory, and school. 
//jm ikaw na mag style
//palagay na lng sa report

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
      <div style={{ marginTop: "20px" }}>
        <h4>{title}</h4>
        <table border="1" style={{ width: "100%", marginBottom: "15px" }}>
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
            <tr style={{ fontWeight: "bold" }}>
              <td>GRAND TOTAL</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>

        {/* Chart */}
        {graphType === "bar" ? (
          <BarChart
            xAxis={[{ scaleType: "band", data: data.map((r) => r.label) }]}
            series={[{ data: data.map((r) => r.value), label: "Users" }]}
            width={600}
            height={400}
          />
        ) : (
          <PieChart
            series={[
              {
                data: data.map((r, i) => ({
                  id: i,
                  value: r.value,
                  label: r.label,
                })),
              },
            ]}
            width={600}
            height={400}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>Overall Reports</h3>

      {/* Graph type selector */}
      <select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        style={{ marginBottom: "15px" }}
      >
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>

      {renderTable("Overall Gender Count", genderData)}
      {renderTable("Overall User Category Count", categoryData)}
      {renderTable("Overall User School Count", schoolData)}
    </div>
  );
}

export default OverallStats;
