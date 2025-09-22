import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import api from "../api/api";

export default function BookTable() {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // ✅ Load books from backend
  useEffect(() => {
    api.get("/books").then((res) => setData(res.data));
  }, []);

  const columns = [
    { header: "ID", accessorKey: "book_id" },
    { header: "Title", accessorKey: "book_title" },
    { header: "Author", accessorKey: "book_author" },
    { header: "Description", accessorKey: "book_description" },
    { header: "Publisher", accessorKey: "book_publisher" },
    {
      header: "Year Published",
      accessorKey: "book_year_publish",
      cell: ({ row }) => row.original.book_year_publish?.slice(0, 10), // YYYY-MM-DD
    },
    { header: "Category", accessorKey: "book_category_name" },
    {
      header: "Status",
      accessorKey: "book_status",
      cell: ({ row }) =>
        row.original.book_status === "y" ? "Available" : "Not Available",
    },
    { header: "Inventory", accessorKey: "book_inventory" },
    { header: "Views", accessorKey: "book_view_count" },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <>
          <button>✏️ Edit</button>
          <button>🗑 Delete</button>
        </>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search books..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      {/* 📖 Table */}
      <table border="1" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
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

      {/* ⏮️ Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          ⏮ Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next ⏭
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
