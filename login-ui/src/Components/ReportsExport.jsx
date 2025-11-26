import { useState, useEffect } from "react";
import api from "../api/api";
import ExcelJS from "exceljs";
import classes from "../CSS-Folder/ReportsExport.module.css";
import { Button } from ".";
import { RiFileExcel2Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { FaRegFilePdf } from "react-icons/fa6";

function ReportsExportPage() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [range, setRange] = useState("all");
  const [type, setType] = useState("gender");
  const [sortBy, setSortBy] = useState("service");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  const handleToggle = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedServices(services.map((s) => s.library_service_id));
  };

  const handleClearAll = () => {
    setSelectedServices([]);
  };

  const getRangeLabel = () => {
    const today = new Date();
    if (range === "today") return `Date: ${today.toISOString().split("T")[0]}`;
    if (range === "week") {
      const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
      const lastDay = new Date(today.setDate(firstDay.getDate() + 6));
      return `Week: ${firstDay.toISOString().split("T")[0]} - ${lastDay.toISOString().split("T")[0]}`;
    }
    if (range === "month") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return `Month: ${start.toISOString().split("T")[0]} - ${end.toISOString().split("T")[0]}`;
    }
    if (range === "year") {
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      return `Year: ${start.toISOString().split("T")[0]} - ${end.toISOString().split("T")[0]}`;
    }
    if (range === "custom" && customDates.start && customDates.end) {
      return `Custom Range: ${customDates.start} - ${customDates.end}`;
    }
    return "All Time";
  };

  const buildSheet = (sheet, rows, title) => {
    let serviceTotals = {};
    let grandTotal = 0;

    // Sort
    if (sortBy === "service") {
      rows.sort((a, b) =>
        a.library_service_name.localeCompare(b.library_service_name)
      );
    } else {
      rows.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    }

    rows.forEach((row) => {
      if (!serviceTotals[row.library_service_name]) {
        serviceTotals[row.library_service_name] = 0;
      }
      serviceTotals[row.library_service_name] += row.total;
      grandTotal += row.total;
    });

    sheet.mergeCells("A1:C1");
    sheet.getCell("A1").value = title;
    sheet.getCell("A1").font = { bold: true, size: 14 };
    sheet.getCell("A1").alignment = { horizontal: "center" };

    sheet.mergeCells("A2:C2");
    sheet.getCell("A2").value = getRangeLabel();
    sheet.getCell("A2").font = { italic: true, size: 11 };
    sheet.getCell("A2").alignment = { horizontal: "center" };

    sheet.addRow([]);
    sheet.addRow(["Service", "Category", "Total"]).font = { bold: true };

    rows.forEach((row) => {
      sheet.addRow([row.library_service_name, row.category || "N/A", row.total]);
    });

    sheet.addRow([]);
    sheet.addRow(["--- Totals per Service ---", "", ""]).font = { bold: true };

    Object.entries(serviceTotals).forEach(([service, total]) => {
      sheet.addRow([service, "TOTAL", total]);
    });

    sheet.addRow([]);
    sheet.addRow(["Grand Total", "", grandTotal]).font = { bold: true };

    sheet.columns.forEach((col) => {
      let max = 10;
      col.eachCell({ includeEmpty: true }, (cell) => {
        max = Math.max(max, cell.value ? cell.value.toString().length : 0);
      });
      col.width = max + 2;
    });
  };

  const handleExport = async () => {
    if (selectedServices.length === 0) {
      toast.warn("Please select at least one service");
      return;
    }

    if (range === "custom" && customDates.start && customDates.end) {
      if (new Date(customDates.start) > new Date(customDates.end)) {
        toast.warn("Start date cannot be later than end date");
        return;
      }
    }

    try {
      const params = new URLSearchParams({
        serviceIds: selectedServices.join(","),
        range,
        type,
        startDate: customDates.start,
        endDate: customDates.end,
      });

      const res = await api.get(`/ReportsExport/export?${params.toString()}`);
      const data = res.data;

      const workbook = new ExcelJS.Workbook();

      if (type === "all") {
        buildSheet(workbook.addWorksheet("Gender"), data.gender, "Gender Report");
        buildSheet(workbook.addWorksheet("Age"), data.age, "Age Group Report");
        buildSheet(workbook.addWorksheet("User Category"), data.user_category, "User Category Report");
        buildSheet(workbook.addWorksheet("User School"), data.user_school, "User School Report");
      } else {
        buildSheet(workbook.addWorksheet("Report"), data, `${type} Report`);
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${type}_report.xlsx`;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export report");
    }
  };

  const pdfStyles = StyleSheet.create({
  page: { padding: 20, fontSize: 11 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: "#eaeaea", padding: 4 },
  tableCol: { width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, padding: 4 },
  tableCell: { textAlign: "center" },
});

const PdfDoc = ({ data, type }) => (
  <Document>
    {type === "all"
      ? ["gender", "age", "user_category", "user_school"].map((reportType) => (
          <Page key={reportType} style={pdfStyles.page}>
            <Text style={pdfStyles.title}>{reportType.replace("_", " ").toUpperCase()} Report</Text>
            <Text style={{ fontSize: 11, marginBottom: 8 }}>{getRangeLabel()}</Text>

            <View style={pdfStyles.table}>
              <View style={pdfStyles.tableRow}>
                <View style={pdfStyles.tableColHeader}><Text>Service</Text></View>
                <View style={pdfStyles.tableColHeader}><Text>Category</Text></View>
                <View style={pdfStyles.tableColHeader}><Text>Total</Text></View>
              </View>

              {data[reportType].map((row, i) => (
                <View key={i} style={pdfStyles.tableRow}>
                  <View style={pdfStyles.tableCol}><Text style={pdfStyles.tableCell}>{row.library_service_name}</Text></View>
                  <View style={pdfStyles.tableCol}><Text style={pdfStyles.tableCell}>{row.category || "N/A"}</Text></View>
                  <View style={pdfStyles.tableCol}><Text style={pdfStyles.tableCell}>{row.total}</Text></View>
                </View>
              ))}
            </View>
          </Page>
        ))
      : (
          <Page style={pdfStyles.page}>
            <Text style={pdfStyles.title}>{type.toUpperCase()} Report</Text>
            <Text style={{ fontSize: 11, marginBottom: 8 }}>{getRangeLabel()}</Text>

            <View style={pdfStyles.table}>
              <View style={pdfStyles.tableRow}>
                <View style={pdfStyles.tableColHeader}><Text>Service</Text></View>
                <View style={pdfStyles.tableColHeader}><Text>Category</Text></View>
                <View style={pdfStyles.tableColHeader}><Text>Total</Text></View>
              </View>

              {data.map((row, i) => (
                <View key={i} style={pdfStyles.tableRow}>
                  <View style={pdfStyles.tableCol}><Text style={pdfStyles.tableCell}>{row.library_service_name}</Text></View>
                  <View style={pdfStyles.tableCol}><Text style={pdfStyles.tableCell}>{row.category || "N/A"}</Text></View>
                  <View style={pdfStyles.tableCol}><Text style={pdfStyles.tableCell}>{row.total}</Text></View>
                </View>
              ))}
            </View>
          </Page>
        )}
  </Document>
);


const exportPDF = async () => {
  if (selectedServices.length === 0) {
    toast.warn("Please select at least one service");
    return;
  }

  try {
    const params = new URLSearchParams({
      serviceIds: selectedServices.join(","),
      range,
      type,
      startDate: customDates.start,
      endDate: customDates.end,
    });

    const res = await api.get(`/ReportsExport/export?${params.toString()}`);
    const data = res.data;

    const blob = await pdf(<PdfDoc data={data} type={type} />).toBlob();
    saveAs(blob, `${type}_report.pdf`);
  } catch (err) {
    console.error("PDF export failed:", err);
    toast.error("Failed to export PDF report");
  }
};




  return (
    <div className={classes.BackgroundContainer}>
      <h3>Generate Reports</h3>

      <div>
        <div className={classes.MainContainer}>
        <label className={classes.switch}>
          <input
            type="checkbox"
            checked={selectedServices.length === services.length}
            onChange={(e) => {
              if (e.target.checked) {
                handleSelectAll();   
              } else {
                handleClearAll();  
              }
            }}
          />
          <span className={classes.slider}></span>
          <span className={classes.SwitchLabel}>
            {selectedServices.length === services.length ? "Clear All" : "Select All"}
          </span>
        </label>

        <div className={classes.FilterContainer}>
            <label>
          Report Type:{" "}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="gender">Gender</option>
            <option value="age">Age Group</option>
            <option value="user_category">User Category</option>
            <option value="user_school">User School</option>
            <option value="all">All Reports</option>
          </select>
        </label>

        <label>
          Date Range:{" "}
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        
        <label>
          Sort By:{" "}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="service">Service</option>
            <option value="label">Label</option>
          </select>
        </label>
      </div>
      </div>
      </div>

      <div className={classes.CheckboxContainer}>
        {services.map((s) => (
          <div key={s.library_service_id}>
            <label>
              <input
                type="checkbox"
                checked={selectedServices.includes(s.library_service_id)}
                onChange={() => handleToggle(s.library_service_id)}
              />
              {s.library_service_name}
            </label>
          </div>
        ))}
      </div>

      <div className={classes.SelectContainer}>
      
      {range === "custom" && (
        <div>
          <label>
            Start Date:{" "}
            <input
              type="date"
              value={customDates.start}
              onChange={(e) =>
                setCustomDates((prev) => ({ ...prev, start: e.target.value }))
              }
            />
          </label>
          <label>
            End Date:{" "}
            <input
              type="date"
              value={customDates.end}
              onChange={(e) =>
                setCustomDates((prev) => ({ ...prev, end: e.target.value }))
              }
            />
          </label>
        </div>
      )}

      </div>
      <div>
      
      <div className={classes.ButtonContainer}>
        <Button 
        onClick={handleExport}
        use="ExportExcel"
        name={<><RiFileExcel2Line size={25} 
        /><span>Export to Excel</span></>}
        cooldown={2000}
        />
      
      <Button 
        onClick={exportPDF} 
        name={<><FaRegFilePdf size={25} /><span>Export to PDF</span></>} 
        use="ExportPDF" 
      />
      </div>
      </div>

    </div>
    
  );
  
}

export default ReportsExportPage;
