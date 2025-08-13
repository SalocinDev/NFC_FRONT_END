import React from "react";
import classes from '/src/CSS-Folder/Table.module.css';

const Table = ({ columns = [], records = [] }) => {
  return (
    <div className={classes.tableWrapper}>
      <div className={classes.tableContainer}>
        <table>
          <thead>
            <tr>
              {columns.length > 0 ? (
                columns.map((col, index) => <th key={index}>{col}</th>)
              ) : (
                <th>No Columns</th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => {
                    const key = col.toLowerCase().replace(/\s+/g, '');
                    return <td key={colIndex}>{record[key]}</td>;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length || 1} style={{ textAlign: "center" }}>
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
