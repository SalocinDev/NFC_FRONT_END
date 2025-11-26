import React from "react";
import classes from "../CSS-Folder/Table.module.css";
import {
  GrCaretNext,
  GrChapterNext,
  GrCaretPrevious,
  GrChapterPrevious,
} from "react-icons/gr";
import { Button } from ".";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const formatHeader = (key) => {
  return key
    .replace(/_fk$/i, "")
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
  mobilePageSize = 2,
  mobileIcons = {},
}) => {
  const [selectedRows, setSelectedRows] = React.useState({});
  const [mobilePage, setMobilePage] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024);

  const [sorting, setSorting] = React.useState([]);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          enableSorting: !["actions", "select"].includes(key), // hide sort icons for these
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
                  table.getRowModel().rows.every(
                    (row) => selectedRows[row.id]
                  )
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
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const allRows = table.getRowModel().rows;
  const startIndex = mobilePage * mobilePageSize;
  const endIndex = startIndex + mobilePageSize;
  const mobileRows = allRows.slice(startIndex, endIndex);

  return (
    <div className={`${classes.tableWrapper} ${wrapperClass}`}>
      <div className={`${classes.tableContainer} ${containerClass}`}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnId = header.column.id;
                  const icon = mobileIcons[columnId];
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span style={{ marginLeft: "5px" }}>
                          {{
                            asc: <FaSortUp size={10} />,
                            desc: <FaSortDown size={10} />,
                          }[header.column.getIsSorted()] ?? <FaSort size={10} />}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {allRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columnsToUse.length || 1}
                  style={{ textAlign: "center" }}
                >
                  No data available
                </td>
              </tr>
            ) : (
              (isMobile ? mobileRows : allRows).map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      data-label={
                        cell.column.columnDef.header
                          ? typeof cell.column.columnDef.header === "string"
                            ? cell.column.columnDef.header
                            : formatHeader(cell.column.id)
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* desktop pagination */}
        {!isMobile && (
          <div className={classes.paginationControls}>
            <Button
              use="FirstPageTable"
              name={<GrChapterPrevious size={20} />}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />

            <Button
              use="PreviousPageButton"
              name={<GrCaretPrevious size={20} />}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />

            <span className={classes.PageCount}>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>

            <Button
              use="NextPageButton"
              name={<GrCaretNext size={20} />}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />

            <Button
              use="LastPageTable"
              name={<GrChapterNext size={20} />}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            />
          </div>
        )}

        {/* mobile pagination */}
        {isMobile && (
          <div className={classes.mobilePagination}>
            <Button
              use="PreviousPageButton"
              name="Prev"
              onClick={() => setMobilePage((p) => Math.max(p - 1, 0))}
              disabled={mobilePage === 0}
            />
            <span className={classes.PageCount}>
              Page {mobilePage + 1} of{" "}
              {Math.ceil(allRows.length / mobilePageSize)}
            </span>
            <Button
              use="NextPageButton"
              name="Next"
              onClick={() =>
                setMobilePage((p) =>
                  endIndex < allRows.length ? p + 1 : p
                )
              }
              disabled={endIndex >= allRows.length}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
