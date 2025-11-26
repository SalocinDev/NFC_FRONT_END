import React from "react";

const FilterTable = ({ options = [], onFilterChange, dateColumn }) => {
  return (
    <select
      onChange={(e) => onFilterChange(e.target.value, dateColumn)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default FilterTable;
