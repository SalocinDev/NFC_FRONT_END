import { Table } from ".";
import classes from "../CSS-Folder/SurveyFeedback.module.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import { BarChart } from "@mui/x-charts";

function SurveyFeedback() {
    const [mostUsed, setMostUsed] = useState([]);
    const [leastUsed, setLeastUsed] = useState([]);
    const [highestRated, setHighestRated] = useState([]);
    const [lowestRated, setLowestRated] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const res = await api.get("/data-analysis/analytics");
            if (res.data.success) {
                setMostUsed(res.data.mostUsed || []);
                setLeastUsed(res.data.leastUsed || []);
                setHighestRated(res.data.highestRated || []);
                setLowestRated(res.data.lowestRated || []);
            } else {
                setMostUsed([]);
                setLeastUsed([]);
                setHighestRated([]);
                setLowestRated([]);
            }
        } catch (err) {
            console.error("Error fetching analytics:", err);
            setMostUsed([]);
            setLeastUsed([]);
            setHighestRated([]);
            setLowestRated([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) return <p>Loading analytics...</p>;

    const CountCard = ({ label, count }) => (
        <div className={classes.CountCard}>
            <h5>{label}</h5>
            <p>{count}</p>
        </div>
    );

    const renderBarChart = (
        data,
        labelKey = "library_service_name",
        valueKey = "usage_count"
    ) => (
        <BarChart
            xAxis={[{ scaleType: "band", data: data.map(item => item[labelKey]) }]}
            series={[{ data: data.map(item => Number(item[valueKey] || 0)) }]}
            width={700}
            height={250}
        />
    );

    return (
        <div className={classes.ChartsContainer}>
            <h3>Services Survey Analytics</h3>

{/*             <div className={classes.CountRow}>
                <CountCard label="Most Used Count" count={mostUsed.length} />
                <CountCard label="Least Used Count" count={leastUsed.length} />
                <CountCard label="Highest Rated Count" count={highestRated.length} />
                <CountCard label="Lowest Rated Count" count={lowestRated.length} />
            </div> */}

            <div className={classes.ChartSection}>
                <h4>Most Used Services</h4>
                <Table records={mostUsed} />
                {mostUsed.length > 0 && renderBarChart(mostUsed)}
            </div>

            <div className={classes.ChartSection}>
                <h4>Least Used Services</h4>
                <Table records={leastUsed} />
                {leastUsed.length > 0 && renderBarChart(leastUsed)}
            </div>

            <div className={classes.ChartSection}>
                <h4>Highest Rated Services</h4>
                <Table records={highestRated} />
                {highestRated.length > 0 &&
                    renderBarChart(highestRated, "library_service_name", "avg_rating")}
            </div>

            <div className={classes.ChartSection}>
                <h4>Lowest Rated Services</h4>
                <Table records={lowestRated} />
                {lowestRated.length > 0 &&
                    renderBarChart(lowestRated, "library_service_name", "avg_rating")}
            </div>
        </div>
    );
}

export default SurveyFeedback;
