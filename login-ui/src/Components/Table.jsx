import React from "react";
import classes from '../CSS-Folder/Table.module.css';

// Utility: format snake_case or camelCase into Pretty Headers
const formatHeader = (key) => {
  return key
    .replace(/_/g, " ")          // convert snake_case → snake case
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → camel Case
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize words
};

const Table = ({ 
  columns = [], 
  records = [], 
  wrapperClass = "", 
  containerClass = "" 
}) => {

  const autoColumns = columns.length > 0 
    ? columns 
    : records.length > 0 
      ? Object.keys(records[0]) 
      : [];

  return (
    <div className={`${classes.tableWrapper} ${wrapperClass}`}>
      <div className={`${classes.tableContainer} ${containerClass}`}>
        <table>
          <thead>
            <tr>
              {autoColumns.length > 0 ? (
                autoColumns.map((col, index) => (
                  <th key={index}>
                    {formatHeader(col)} 
                  </th>
                ))
              ) : (
                <th>No Columns</th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, rowIndex) => (
                <tr key={rowIndex}>
                  {autoColumns.map((col, colIndex) => (
                    <td key={colIndex}>{record[col]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={autoColumns.length || 1} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
