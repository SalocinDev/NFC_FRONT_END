import { useEffect, useState } from "react";
import api from "../api/api";
import classes from "../CSS-Folder/CountsOverview.module.css";
import { BarChart } from "@mui/x-charts";

function CountsSummary() {
  const [serviceLogs, setServiceLogs] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const [logsRes, usersRes, servicesRes, feedbackRes] = await Promise.all([
        api.get("/data-analysis/services/log"),
        api.get("/data-analysis/users/count"),
        api.get("/data-analysis/services/count"),
        api.get("/data-analysis/surveyfeedback/count"),
      ]);

      setServiceLogs(logsRes.data.data || []);
      setUserCount(usersRes.data.data[0]?.User_Count || 0);
      setServiceCount(servicesRes.data.data[0]?.Service_Count || 0);
      setFeedbackCount(feedbackRes.data.data[0]?.Survey_Feedback_Count || 0);

    } catch (err) {
      console.error("Failed to load counts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) return <p>Loading count summary...</p>;

  return (
    <div className={classes.ChartsContainer}>
      <h2>Library Counts Overview</h2>

      <div className={classes.CountCardRow}>
        <div className={classes.CountCard}>
          <h4>Total Users</h4>
          <p>{userCount}</p>
        </div>

        <div className={classes.CountCard}>
          <h4>Total Services</h4>
          <p>{serviceCount}</p>
        </div>

        <div className={classes.CountCard}>
          <h4>Total Survey Feedback</h4>
          <p>{feedbackCount}</p>
        </div>
      </div>

      <div className={classes.ChartSection}>
        <h2>Service Log Usage</h2>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: serviceLogs.map((item) => item.library_service_name),
            },
          ]}
          series={[
            {
              data: serviceLogs.map((item) => Number(item.count || 0))
            },
          ]}
          width={800}
          height={300}
        />
      </div>
    </div>
  );
}

export default CountsSummary;
