import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Button } from "../Components";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import classes from "../CSS-Folder/SurveyReportExport.module.css";

const SurveyReportExport = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [range, setRange] = useState("today");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });
  const [reportData, setReportData] = useState({ details: [], summary: [] });

  useEffect(() => {
    api.get("/survey/all-services").then((res) => setServices(res.data));
  }, []);

  const fetchReport = async () => {
    const payload = {
      serviceIds: selectedServices,
      range,
      startDate: customDates.start,
      endDate: customDates.end,
    };
    const res = await api.post("/survey/report", payload);
    setReportData(res.data);
  };

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Survey Report");

    // --- Header ---
    sheet.mergeCells("A1", "C1");
    sheet.getCell("A1").value = `Survey Report (${range.toUpperCase()})`;
    sheet.getCell("A1").font = { bold: true, size: 16 };
    sheet.addRow([]);

    // --- Summary Section ---
    sheet.addRow(["Service", "Average Rating", "Total Responses"]);
    reportData.summary.forEach((s) =>
      sheet.addRow([s.library_service_name, s.avg_rating, s.total_responses])
    );
    sheet.addRow([]);
    sheet.addRow([]);

    // --- Detailed Data Section ---
    sheet.addRow(["Service Name", "Rating", "Timestamp"]);
    reportData.details.forEach((d) =>
      sheet.addRow([d.library_service_name, d.feedback_rating, d.response_timestamp])
    );

    sheet.columns = [
      { width: 30 },
      { width: 15 },
      { width: 25 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Survey_Report_${range}.xlsx`);
  };

  // --- PDF Styles ---
  const styles = StyleSheet.create({
    page: { padding: 20 },
    title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
    sectionTitle: { marginTop: 10, marginBottom: 5, fontWeight: "bold" },
    row: { marginBottom: 4 },
  });

  const PdfDoc = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Survey Report ({range.toUpperCase()})</Text>

        <Text style={styles.sectionTitle}>Summary</Text>
        {reportData.summary.length === 0 && <Text>No summary data.</Text>}
        {reportData.summary.map((s, i) => (
          <Text key={i} style={styles.row}>
            {s.library_service_name} — Avg: {s.avg_rating} ({s.total_responses} responses)
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Detailed Responses</Text>
        {reportData.details.map((d, i) => (
          <Text key={i} style={styles.row}>
            {d.library_service_name}: Rating {d.feedback_rating} — {new Date(d.response_timestamp).toLocaleString()}
          </Text>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className={classes.MainDiv}>
      <h2>Export Survey Report</h2>

      {/* --- Service Selector --- */}
      <div className={classes.FilterSection}>
        <label>Select Services:</label>
        <div className={classes.ServiceList}>
          {services.map((svc) => (
            <label key={svc.library_service_id}>
              <input
                type="checkbox"
                value={svc.library_service_id}
                checked={selectedServices.includes(svc.library_service_id)}
                onChange={(e) => {
                  const id = svc.library_service_id;
                  setSelectedServices((prev) =>
                    e.target.checked ? [...prev, id] : prev.filter((sid) => sid !== id)
                  );
                }}
              />
              {svc.library_service_name}
            </label>
          ))}
        </div>
      </div>

      {/* --- Time Range Selector --- */}
      <div className={classes.FilterSection}>
        <label>Time Range:</label>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
          <option value="custom">Custom</option>
        </select>

        {range === "custom" && (
          <div className={classes.CustomRange}>
            <input
              type="date"
              value={customDates.start}
              onChange={(e) => setCustomDates({ ...customDates, start: e.target.value })}
            />
            <span>to</span>
            <input
              type="date"
              value={customDates.end}
              onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* --- Buttons --- */}
      <div className={classes.ActionButtons}>
        <Button name="Fetch Report" use="Primary" onClick={fetchReport} />
        {reportData.details.length > 0 && (
          <>
            <Button name="Export to Excel" use="Success" onClick={exportExcel} />
            <PDFDownloadLink document={<PdfDoc />} fileName={`Survey_Report_${range}.pdf`}>
              {({ loading }) => (
                <Button name={loading ? "Generating..." : "Export to PDF"} use="Warning" />
              )}
            </PDFDownloadLink>
          </>
        )}
      </div>

      {/* --- Preview Table --- */}
      {reportData.details.length > 0 && (
        <>
          <h3>Summary</h3>
          <table className={classes.ReportTable}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Average Rating</th>
                <th>Total Responses</th>
              </tr>
            </thead>
            <tbody>
              {reportData.summary.map((row, i) => (
                <tr key={i}>
                  <td>{row.library_service_name}</td>
                  <td>{row.avg_rating}</td>
                  <td>{row.total_responses}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Detailed Responses</h3>
          <table className={classes.ReportTable}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Rating</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {reportData.details.map((row, i) => (
                <tr key={i}>
                  <td>{row.library_service_name}</td>
                  <td>{row.feedback_rating}</td>
                  <td>{new Date(row.response_timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SurveyReportExport;
