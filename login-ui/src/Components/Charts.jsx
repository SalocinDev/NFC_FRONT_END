//report for user of service in user category, user gender, and user age group.
//jm ikaw na mag style
//palagay na lng sa report
import { Table } from '.';
import classes from "../CSS-Folder/Charts.module.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import { BarChart, PieChart } from "@mui/x-charts";

function Charts() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [reportType, setReportType] = useState("age");
  const [range, setRange] = useState("all");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });
  const [reportData, setReportData] = useState([]);
  const [graphType, setGraphType] = useState("bar");
  const [loading, setLoading] = useState(false);

  const staticGroups = {
    age: [
      "Children (<12 - Below)",
      "Adolescents (13-21)",
      "Young Adult (22-35)",
      "Adult (36-59)",
      "Seniors (60 Above)"
    ],
    gender: ["Male", "Female"],
    category: [
      "Elementary Student (ES)",
      "High School Student (HS)",
      "College Student (CS)",
      "Employees-Gov't (EGOV)",
      "Employees-Private (EPRI)",
      "Senior Citizens (SC)",
      "Reviewees (R)",
      "Person with Disabilities (PWD)",
      "Children in Street Situations (CISS)",
      "Out-of-School-youth (OSY)",
      "Housewife/Husband (HH)",
      "LGBTQIAS2+",
      "OTHERS",
      "N/A"
    ]
  };

  // Load services
  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  // Load report data
  useEffect(() => {
    if (!selectedService) return;
    setLoading(true);

    let url = `/Statsreports/service/${selectedService}/${reportType}?range=${range}`;
    if (range === "custom" && customDates.start && customDates.end) {
      url += `&startDate=${customDates.start}&endDate=${customDates.end}`;
    }

    api
      .get(url)
      .then((res) => setReportData(res.data))
      .catch(() => setReportData([]))
      .finally(() => setLoading(false));
  }, [selectedService, reportType, range, customDates]);

  // Merge with static groups for zero values
  const mergedData = staticGroups[reportType].map((label) => {
    const found = reportData.find((r) => r.label === label);
    return { label, value: found ? found.value : 0 };
  });

  return (
    <div>
      <h3>Reports by Service</h3>

      {/* Service Dropdown */}
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">-- Select Service --</option>
        {services.map((s) => (
          <option key={s.library_service_id} value={s.library_service_id}>
            {s.library_service_name}
          </option>
        ))}
      </select>

      {/* Report Type */}
      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="age">Age Groups</option>
        <option value="gender">Gender</option>
        <option value="category">User Categories</option>
      </select>

      {/* Graph Type */}
      <select
        value={graphType}
        onChange={(e) => setGraphType(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>

      {/* Time Range */}
      <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="custom">Custom</option>
      </select>

      {/* Custom Dates */}
      {range === "custom" && (
        <span style={{ marginLeft: "10px" }}>
          <input
            type="date"
            value={customDates.start}
            onChange={(e) =>
              setCustomDates((prev) => ({ ...prev, start: e.target.value }))
            }
          />
          <input
            type="date"
            value={customDates.end}
            onChange={(e) =>
              setCustomDates((prev) => ({ ...prev, end: e.target.value }))
            }
            style={{ marginLeft: "5px" }}
          />
        </span>
      )}

      {/* Results */}
      <div className={classes.ChartContainer} style={{ marginTop: "15px" }}>
        {loading && <p>Loading...</p>}
        {!loading && selectedService && reportData.length === 0 && (
          <p>No data available (showing zeros).</p>
        )}

        {/* Chart */}
        <div style={{ marginTop: "20px" }}>
          {graphType === "bar" ? (
            <BarChart
              xAxis={[{ scaleType: "band", 
              data: mergedData.map((r) => r.label), }]}
          
              series={[{ data: mergedData.map((r) => r.value), label: "Users" }]}
              width={1500}
              height={200}
            />
            


          ) : (
            <PieChart
              series={[
                {
                  data: mergedData.map((r, i) => ({
                    id: i,
                    value: r.value,
                    label: r.label
                  }))
                }
              ]}
              width={600}
              height={400}
              
            />
          )}
        </div>

        
        <table border="1" style={{ marginTop: "15px", width: "80%" }}>
          <thead>
            <tr>
              <th>{reportType.toUpperCase()}</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.label}</td>
                <td>{row.value}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: "bold", background: "#f0f0f0" }}>
              <td>GRAND TOTAL</td>
              <td>{mergedData.reduce((sum, row) => sum + row.value, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Charts;
