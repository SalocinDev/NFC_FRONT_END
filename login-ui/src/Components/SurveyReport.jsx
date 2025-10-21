import React, { useEffect, useState, useMemo } from "react";
import api from "../api/api";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import classes from '../CSS-Folder/SurveyReport.module.css';

const SurveyReport = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [dateRange, setDateRange] = useState("today");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [reportData, setReportData] = useState([]);
  const [avgRatings, setAvgRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [fetched, setFetched] = useState(false); //Hide chart/tables until clicked

  //Fetch services once
  useEffect(() => {
    let active = true;
    api
      .get("/survey/all-services")
      .then((res) => {
        if (active) setServices(res.data || []);
      })
      .catch((err) => console.error("Error fetching services:", err));
    return () => {
      active = false;
    };
  }, []);

  //Fetch report
  const fetchReport = async () => {
    if (!selectedService) {
      alert("Please select a service.");
      return;
    }

    if (dateRange === "custom" && (!customStart || !customEnd)) {
      alert("Please select valid custom start and end dates.");
      return;
    }

    if (dateRange === "custom" && customStart > customEnd) {
      alert("Invalid range: start date must be before end date.");
      return;
    }

    setLoading(true);
    setNoData(false);
    setFetched(false);

    try {
      const params =
        dateRange === "custom"
          ? { range: dateRange, start: customStart, end: customEnd }
          : { range: dateRange };

      const res = await api.get(`/survey/report/${selectedService}`, {
        params,
      });

      if (!res.data) {
        setNoData(true);
        setReportData([]);
        setAvgRatings([]);
        return;
      }

      const svc = services.find(
        (s) => s.library_service_id === parseInt(selectedService)
      );

      const formatted =
        res.data?.ratings?.map((r) => ({
          library_service_name: svc?.library_service_name || "Unknown",
          feedback_rating: r.feedback_rating,
          total: r.total,
        })) || [];

      const avg = [
        {
          library_service_id: selectedService,
          library_service_name: svc?.library_service_name || "Unknown",
          avg_rating: res.data?.avg_rating || 0,
          total_responses: res.data?.total_responses || 0,
        },
      ];

      setReportData(formatted);
      setAvgRatings(avg);

      if (!formatted.some((f) => f.total > 0)) {
        setNoData(true);
      } else {
        setFetched(true);
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  //Memoized values for performance
  const totalCount = useMemo(
    () => reportData.reduce((acc, row) => acc + (row.total || 0), 0),
    [reportData]
  );

  const tableData = useMemo(
    () =>
      reportData.length
        ? [
            ...reportData,
            {
              library_service_name: "Total",
              feedback_rating: "",
              total: totalCount,
            },
          ]
        : [],
    [reportData, totalCount]
  );

  const columns = useMemo(
    () => [
      { header: "Service Name", accessorKey: "library_service_name" },
      { header: "Rating", accessorKey: "feedback_rating" },
      { header: "Total", accessorKey: "total" },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const chartData = useMemo(() => {
    if (!reportData.length) return { labels: [], values: [] };
    return {
      labels: reportData.map((r) => `${r.feedback_rating} ⭐`),
      values: reportData.map((r) => r.total),
    };
  }, [reportData]);

  return (
    <div >
      <h2>Library Survey Report</h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map((svc) => (
            <option key={svc.library_service_id} value={svc.library_service_id}>
              {svc.library_service_name}
            </option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom</option>
        </select>

        {dateRange === "custom" && (
          <>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
            />
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </>
        )}

        <button onClick={fetchReport} disabled={loading}>
          {loading ? "Loading..." : "Go"}
        </button>
      </div>

      {/* Status messages */}
      {loading && <p>Loading data...</p>}
      {!loading && noData && <p style={{ color: "gray" }}>No data found.</p>}

      {/* Render only when fetched and data exists */}
      {fetched && !noData && (
        <>
          {/* Chart */}
          {chartData.labels.length > 0 && (
            <BarChart
              xAxis={[{ scaleType: "band", data: chartData.labels }]}
              series={[{ data: chartData.values, label: "Responses" }]}
              height={350}
            />
          )}

          {/* Ratings Table */}
          <table
            border="1"
            cellPadding="8"
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ background: "#f0f0f0" }}>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Average Ratings */}
          {avgRatings.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4>Average Ratings</h4>
              <table
                border="1"
                cellPadding="8"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead style={{ background: "#f0f0f0" }}>
                  <tr>
                    <th>Service</th>
                    <th>Average Rating</th>
                    <th>Total Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {avgRatings.map((row) => (
                    <tr key={row.library_service_id}>
                      <td>{row.library_service_name}</td>
                      <td>{row.avg_rating}</td>
                      <td>{row.total_responses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SurveyReport;
