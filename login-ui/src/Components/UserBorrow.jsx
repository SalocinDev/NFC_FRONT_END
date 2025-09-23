import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const apiUrl = import.meta.env.VITE_API_URL;

export default function MyBorrowsTable() {
  const [data, setData] = useState([]);

  //Fetch borrowed books for the logged-in user
  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await fetch(`${apiUrl}/borrows/my-borrows`, {
          method: "GET",
          credentials: "include", //send session cookie
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch borrows:", err);
      }
    };

    fetchBorrows();
  }, []);

  //Define table columns
  const columns = [
    { header: "Borrow ID", accessorKey: "borrow_id" },
    { header: "Book Title", accessorKey: "book_title" },
    { header: "Author", accessorKey: "book_author" },
    { header: "Publisher", accessorKey: "book_publisher" },
    {
      header: "Borrowed Date",
      accessorKey: "book_borrowed_date",
      cell: ({ row }) =>
        row.original.book_borrowed_date?.slice(0, 10) || "N/A",
    },
    {
      header: "Due Date",
      accessorKey: "borrowed_due_date",
      cell: ({ row }) =>
        row.original.borrowed_due_date?.slice(0, 10) || "N/A",
    },
  ];

  // ✅ Initialize table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h2>📖 My Borrowed Books</h2>
      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No borrowed books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
