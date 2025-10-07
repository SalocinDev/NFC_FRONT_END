import React from "react";
import classes from "../CSS-Folder/Table.module.css";
import { GrCaretNext, GrChapterNext, GrCaretPrevious, GrChapterPrevious } from "react-icons/gr";
import { Button } from ".";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const formatHeader = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Table = ({
  columns = [],
  records = [],
  wrapperClass = "",
  containerClass = "",
  onColumnsReady,
  onRowClick,
  onSelectedRowsChange,
  checkbox = false,
  view = false,
  onViewRow,
  hiddenColumns = [], 
}) => {
  const [selectedRows, setSelectedRows] = React.useState({});

  const updateSelected = (newSelected) => {
    setSelectedRows(newSelected);
    if (onSelectedRowsChange) onSelectedRowsChange(newSelected);
  };

  const autoColumns =
    columns.length > 0
      ? columns
      : records.length > 0
      ? Object.keys(records[0]).map((key) => ({
          accessorKey: key,
          header: formatHeader(key),
          cell: ({ getValue }) => {
            const val = getValue();
            return typeof val === "string" && val.includes("T")
              ? formatDate(val)
              : val;
          },
        }))
      : [];

  let columnsToUse = [
    ...(checkbox && records.length > 0
      ? [
          {
            id: "select",
            header: ({ table }) =>
              table.getRowModel().rows.length > 0 ? (
                <input
                  className={classes.SelectRow}
                  type="checkbox"
                  checked={
                    table.getRowModel().rows.length > 0 &&
                    table.getRowModel().rows.every((row) => selectedRows[row.id])
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newSelected = {};
                    table.getRowModel().rows.forEach((row) => {
                      newSelected[row.id] = checked;
                    });
                    updateSelected(newSelected);
                  }}
                />
              ) : null,
            cell: ({ row }) =>
              row.original && Object.keys(row.original).length > 0 ? (
                <input
                  className={classes.SelectRow}
                  type="checkbox"
                  checked={!!selectedRows[row.id]}
                  onChange={(e) => {
                    const newSelected = {
                      ...selectedRows,
                      [row.id]: e.target.checked,
                    };
                    updateSelected(newSelected);
                  }}
                />
              ) : null,
          },
        ]
      : []),
    ...autoColumns,
  ];

  if (view) {
    columnsToUse = [
      ...columnsToUse,
      {
        id: "actions",
        header: "VIEW USER",
        cell: ({ row }) => (
          <button
            className={classes.viewButton}
            onClick={() => onViewRow && onViewRow(row.original)}
            disabled={Object.values(selectedRows).some((val) => val)}
          >
            VIEW
          </button>
        ),
      },
    ];
  }

  columnsToUse = columnsToUse.filter(
    (col) => !hiddenColumns.includes(col.accessorKey || col.id)
  );

  React.useEffect(() => {
    if (columnsToUse.length > 0 && onColumnsReady) {
      onColumnsReady(
        columnsToUse
          .filter((c) => c.accessorKey)
          .map((c) => c.accessorKey)
      );
    }
  }, [columnsToUse, onColumnsReady]);

  const table = useReactTable({
    data: records,
    columns: columnsToUse,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
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
                <td
                  colSpan={columnsToUse.length || 1}
                  style={{ textAlign: "center" }}
                >
                  No data available
                </td>
              </tr>
            ) : (
              Array.from({ length: 10 }).map((_, i) => {
                const row = table.getRowModel().rows[i];
                return row ? (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick && onRowClick(row.original)}
                    style={{ cursor: onRowClick ? "pointer" : "default" }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ) : (
                  <tr key={`empty-${i}`}>
                    {columnsToUse.map((_, colIndex) => (
                      <td key={colIndex}>&nbsp;</td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className={classes.paginationControls}>
          <Button
            use="FirstPageTable"
            name={<><GrChapterPrevious size={20} 
             /></>}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          />
          
          <Button
            use="PreviousPageButton"
            name={<><GrCaretPrevious size={20} 
             /></>}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />

          <span className={classes.PageCount}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <Button
            use="NextPageButton"
            name={<><GrCaretNext size={20} 
             /></>}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
      
          <Button
            use="LastPageTable"
            name={<><GrChapterNext size={20} 
             /></>}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
    
        </div>
      </div>
    </div>
  );
};

export default Table;
