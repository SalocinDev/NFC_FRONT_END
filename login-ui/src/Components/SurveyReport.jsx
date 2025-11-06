import React, { useEffect, useState, useMemo } from "react";
import api from "../api/api";
import { Button, Input } from ".";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { AiOutlineSelect } from "react-icons/ai";
import classes from "../CSS-Folder/SurveyReport.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [fetched, setFetched] = useState(false);
  const [comments, setComments] = useState([]);
  const [sorting, setSorting] = useState([]);
  

  // Fetch all services
  useEffect(() => {
    api
      .get("/survey/all-services")
      .then((res) => setServices(res.data || []))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Fetch report or comments data
  const fetchReport = async () => {
    if (!selectedService) return toast.warn("Please select a report type.");

    if (dateRange === "custom" && (!customStart || !customEnd)) {
      return toast.warn("Please select valid start and end dates.");
    }

    if (dateRange === "custom" && customStart > customEnd) {
      return toast.warn("Invalid range: start date must be before end date.");
    }

    setLoading(true);
    setNoData(false);
    setFetched(false);
    setComments([]);
    setReportData([]);
    setAvgRatings([]);

    try {
      const params =
        dateRange === "custom"
          ? { range: dateRange, start: customStart, end: customEnd }
          : { range: dateRange };

      // “All Comments” mode
      if (selectedService === "all-comments") {
        const res = await api.get(`/survey/comments-all`, { params });
        setComments(res.data || []);
        setFetched(true);
        setNoData(res.data.length === 0);
        return;
      }

      // Specific service report
      const res = await api.get(`/survey/report/${selectedService}`, { params });

      if (!res.data) {
        setNoData(true);
        return;
      }

      const svc = services.find(
        (s) => s.library_service_id === parseInt(selectedService)
      );

      const formattedRatings =
        res.data?.ratings?.map((r) => ({
          feedback_rating: r.feedback_rating,
          total: r.total,
          service_name: svc?.library_service_name || "Unknown Service",
        })) || [];

      const avg = [
        {
          avg_rating: res.data?.avg_rating || 0,
          total_responses: res.data?.total_responses || 0,
        },
      ];

      setReportData(formattedRatings);
      setAvgRatings(avg);
      setNoData(!formattedRatings.some((f) => f.total > 0));
      setFetched(true);
    } catch (err) {
      console.error("Error fetching report:", err);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  // Memoized totals
  const totalCount = useMemo(
    () => reportData.reduce((acc, r) => acc + (r.total || 0), 0),
    [reportData]
  );

  // Rating table setup
  const ratingColumns = useMemo(
    () => [
      { header: "Rating", accessorKey: "feedback_rating" },
      { header: "Total", accessorKey: "total" },
    ],
    []
  );

  const ratingTableData = useMemo(
    () => [...reportData, { feedback_rating: "Total", total: totalCount }],
    [reportData, totalCount]
  );

  const ratingTable = useReactTable({
    data: ratingTableData,
    columns: ratingColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Average rating table setup
  const avgColumns = useMemo(
    () => [
      { header: "Average Rating", accessorKey: "avg_rating" },
      { header: "Total Responses", accessorKey: "total_responses" },
    ],
    []
  );

  const avgTable = useReactTable({
    data: avgRatings,
    columns: avgColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Comments table setup
  const commentColumns = useMemo(
    () => [
      { header: "User ID", accessorKey: "user_id_fk" },
      { header: "Service", accessorKey: "library_service_name" },
      { header: "Rating", accessorKey: "feedback_rating" },
      { header: "Comment", accessorKey: "comment" },
      {
        header: "Date",
        accessorKey: "response_timestamp",
        cell: (info) =>
          new Date(info.getValue()).toLocaleString("en-PH", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
      },
    ],
    []
  );

  const commentTable = useReactTable({
    data: comments,
    columns: commentColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Virtualized rows
  const parentRef = React.useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: commentTable.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  const chartData = useMemo(() => {
    if (!reportData.length) return { labels: [], values: [] };
    return {
      labels: reportData.map((r) => `${r.feedback_rating} ⭐`),
      values: reportData.map((r) => r.total),
    };
  }, [reportData]);

  return (
    <div className={classes.MainDiv}>
      <h2>Library Survey Report</h2>

      {/* Filter Controls */}
      <div className={classes.ButtonContainer}>
        <div className={classes.SelectContainer}>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select Report Type</option>
            <option value="all-comments">All Comments (General)</option>
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
            <option value="all">All Time</option>
            <option value="custom">Custom</option>
          </select>

          <Button
            onClick={fetchReport}
            disabled={loading}
            use="GoButtonSurvey"
            name={
              loading ? "Loading..." : (
                <>
                  <AiOutlineSelect size={20} /> Go
                </>
              )
            }
          />
        </div>

        {dateRange === "custom" && (
          <div className={classes.CustomInput}>
            <Input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
            />
            <Input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </div>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {!loading && noData && <p>No data found for this selection.</p>}

      {/* Charts and Ratings */}
      {fetched && !noData && selectedService !== "all-comments" && (
        <>
          <BarChart
            xAxis={[{ scaleType: "band", data: chartData.labels }]}
            series={[{ data: chartData.values, label: "Responses" }]}
            height={350}
          />

          <h4>Ratings ({reportData[0]?.service_name})</h4>
          <table className={classes.Table}>
            <thead>
              {ratingTable.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {ratingTable.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Average Rating</h4>
          <table className={classes.Table}>
            <thead>
              {avgTable.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {avgTable.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Comments Section */}
      {fetched && selectedService === "all-comments" && (
        <div style={{ marginTop: "20px" }}>
          <h4>All User Comments</h4>
          {comments.length === 0 ? (
            <p>No comments for this period.</p>
          ) : (
            <>
              <div
                ref={parentRef}
                style={{
                  height: "500px",
                  overflow: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#f8f9fa",
                      textAlign: "left",
                      borderBottom: "2px solid #ccc",
                      zIndex: 1,
                    }}
                  >
                    {commentTable.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              userSelect: "none",
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted()] ?? null}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {virtualRows.map((virtualRow) => {
                      const row = commentTable.getRowModel().rows[virtualRow.index];
                      return (
                        <tr
                          key={row.id}
                          style={{
                            background: virtualRow.index % 2 === 0 ? "#fff" : "#f7f7f7",
                            transition: "background 0.2s",
                            height: "70px",
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              style={{
                                padding: "10px",
                                borderBottom: "1px solid #eee",
                                verticalAlign: "top",
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Button
                  onClick={() => commentTable.previousPage()}
                  disabled={!commentTable.getCanPreviousPage()}
                  name="Previous"
                />
                <span>
                  Page {commentTable.getState().pagination.pageIndex + 1} of{" "}
                  {commentTable.getPageCount()}
                </span>
                <Button
                  onClick={() => commentTable.nextPage()}
                  disabled={!commentTable.getCanNextPage()}
                  name="Next"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyReport;
