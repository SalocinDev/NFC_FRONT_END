import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Button } from "../Components";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { RiFileExcel2Line } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa6";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import classes from "../CSS-Folder/SurveyReportExport.module.css";


const SurveyReportExport = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [range, setRange] = useState("today");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  // Helper to fetch report data
  const fetchReport = async () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return null;
    }

    setLoading(true);
    try {
      const payload = {
        serviceIds: selectedServices,
        range,
        startDate: customDates.start,
        endDate: customDates.end,
      };
      const res = await api.post("/survey/report", payload);
      return res.data;
    } catch (err) {
      console.error("Error fetching report:", err);
      alert("Failed to fetch report data.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  //Export to Excel
  const exportExcel = async () => {
    const data = await fetchReport();
    if (!data || data.summary.length === 0) {
      alert("No data available for export.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Survey Report");

    // Title
    sheet.mergeCells("A1", "H1");
    sheet.getCell("A1").value = `Survey Report (${range.toUpperCase()})`;
    sheet.getCell("A1").font = { bold: true, size: 16 };
    sheet.addRow([]);

    // Header
    sheet.addRow([
      "Service",
      "Avg Rating",
      "Total Responses",
      "1 Star",
      "2 Stars",
      "3 Stars",
      "4 Stars",
      "5 Stars",
    ]);
    sheet.getRow(sheet.lastRow.number).font = { bold: true };

    // Data
    data.summary.forEach((s) => {
      sheet.addRow([
        s.library_service_name,
        s.avg_rating,
        s.total_responses,
        s.rating_counts?.["1"] || 0,
        s.rating_counts?.["2"] || 0,
        s.rating_counts?.["3"] || 0,
        s.rating_counts?.["4"] || 0,
        s.rating_counts?.["5"] || 0,
      ]);
    });

    sheet.columns = [
      { width: 30 },
      { width: 12 },
      { width: 15 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Survey_Report_${range}.xlsx`);
  };

  // PDF Styles
  const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 11 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginTop: 10,
    },
    tableRow: { flexDirection: "row" },
    tableColHeader: {
      width: "12.5%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: "#eaeaea",
      padding: 4,
    },
    tableCol: {
      width: "12.5%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 4,
    },
    tableCell: { textAlign: "center" },
  });

  // PDF Document
  const PdfDoc = ({ data }) => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Survey Report ({range.toUpperCase()})</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text>Service</Text></View>
            <View style={styles.tableColHeader}><Text>Avg</Text></View>
            <View style={styles.tableColHeader}><Text>Total</Text></View>
            <View style={styles.tableColHeader}><Text>1★</Text></View>
            <View style={styles.tableColHeader}><Text>2★</Text></View>
            <View style={styles.tableColHeader}><Text>3★</Text></View>
            <View style={styles.tableColHeader}><Text>4★</Text></View>
            <View style={styles.tableColHeader}><Text>5★</Text></View>
          </View>

          {data.summary.map((s, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.library_service_name}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.avg_rating}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.total_responses}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.rating_counts?.["1"] || 0}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.rating_counts?.["2"] || 0}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.rating_counts?.["3"] || 0}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.rating_counts?.["4"] || 0}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{s.rating_counts?.["5"] || 0}</Text></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  // ✅ Fixed Export to PDF
  const exportPDF = async () => {
    const data = await fetchReport();
    if (!data || data.summary.length === 0) {
      alert("No data available for export.");
      return;
    }

    try {
      setLoading(true);
      const blob = await pdf(<PdfDoc data={data} />).toBlob();
      saveAs(blob, `Survey_Report_${range}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.MainDiv}>
      <h2>Export Survey Report</h2>

      {/* Service Selector */}
      <div>
      <div className={classes.FilterSection}>
        <div className={classes.ActionButtonsHeader}>
        <label className={classes.switch}>
              <input
                type="checkbox"
                checked={selectedServices.length === services.length && services.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Select All
                    setSelectedServices(services.map((s) => s.library_service_id));
                  } else {
                    // Clear All
                    setSelectedServices([]);
                  }
                }}
              />
              
              <span className={classes.slider}></span>

              <span className={classes.SwitchLabel}>
                {selectedServices.length === services.length && services.length > 0
                  ? "Clear All"
                  : "Select All"}
              </span>
          </label>
          <div className={classes.FilterSection}>
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
              onChange={(e) =>
                setCustomDates({ ...customDates, start: e.target.value })
              }
            />
            <p className={classes.DateRange}>to</p>
            <input
              type="date"
              value={customDates.end}
              onChange={(e) =>
                setCustomDates({ ...customDates, end: e.target.value })
              }
            />
          </div>
        )}
      </div>
      </div>
      </div>
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
                    e.target.checked
                      ? [...prev, id]
                      : prev.filter((sid) => sid !== id)
                  );
                }}
              />
              {svc.library_service_name}
            </label>
          ))}
        </div>
      </div>

      {/* Time Range */}
      {/* Export Buttons */}
      <div className={classes.ActionButtons}>
        <Button
          name={
            loading 
              ? "Generating..." 
              : (
                  <>
                    <RiFileExcel2Line size={25} />
                    <span>Export to Excel</span>
                  </>
                )
          }
          use="ExportExcel"
          disabled={loading}
          onClick={exportExcel}
        />
        <Button
          name={
            loading 
              ? "Generating..." 
              : (
                  <>
                    <FaRegFilePdf size={25} />
                    <span>Export to PDF</span>
                  </>
                )
          }
          use="ExportPDF"
          disabled={loading}
          onClick={exportPDF}
        />

        
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className={classes.LoadingOverlay}>
          <div className={classes.Spinner}></div>
          <p>Generating report, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default SurveyReportExport;
