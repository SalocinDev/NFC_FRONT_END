import React from "react";
import classes from "../CSS-Folder/Table.module.css";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// Utility: format snake_case or camelCase into Pretty Headers
const formatHeader = (key) => {
  return key
    .replace(/_/g, " ") // snake_case → snake case
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → camel Case
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize words
};

const Table = ({
  columns = [],
  records = [],
  wrapperClass = "",
  containerClass = "",
}) => {
  
  const autoColumns =
    columns.length > 0
      ? columns
      : records.length > 0
      ? Object.keys(records[0]).map((key) => ({
          accessorKey: key,
          header: formatHeader(key),
        }))
      : [];

  const table = useReactTable({
    data: records,
    columns: autoColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
    pagination: {
      pageSize: 7,   
    },
  },
  });

  return (
    <div className={`${classes.tableWrapper} ${wrapperClass}`}>
      <div className={`${classes.tableContainer} ${containerClass}`}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
  {table.getRowModel().rows.length === 0 ? (
    <tr>
      <td colSpan={autoColumns.length || 1} style={{ textAlign: "center" }}>
        No data available
      </td>
    </tr>
  ) : (
    Array.from({ length: 7 }).map((_, i) => {
      const row = table.getRowModel().rows[i];
      return row ? (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ) : (
        <tr key={`empty-${i}`}>
          {autoColumns.map((_, colIndex) => (
            <td key={colIndex}>&nbsp;</td>
          ))}
        </tr>
      );
    })
  )}
</tbody>

        </table>

        <div className={classes.paginationControls}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
