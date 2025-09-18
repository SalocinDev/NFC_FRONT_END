import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import api from "../api/axios";

export default function BookTable({ reload, onReload }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [errors, setErrors] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // ✅ Load books
  useEffect(() => {
    api.get("/books").then((res) => setData(res.data));
  }, [reload]);

  // ✅ Load categories
  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await api.delete(`/books/${id}`);
      onReload();
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.book_id);
    setEditValues(book);
    setErrors({});
  };

  const validate = (values) => {
    const errs = {};

    if (!values.book_title || values.book_title.length < 2) {
      errs.book_title = "Title is required (min 2 chars)";
    }
    if (!values.book_author || values.book_author.length < 2) {
      errs.book_author = "Author is required (min 2 chars)";
    }
    if (values.book_description && values.book_description.length < 10) {
      errs.book_description = "Description must be at least 10 chars";
    }
    if (!values.book_year_publish) {
      errs.book_year_publish = "Year is required";
    }
    if (!values.book_category_id_fk) {
      errs.book_category_id_fk = "Category is required";
    }
    if (values.book_inventory < 0) {
      errs.book_inventory = "Inventory must be 0 or greater";
    }

    return errs;
  };

  const handleUpdate = async (id) => {
    const validationErrors = validate(editValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await api.put(`/books/${id}`, editValues);
    setEditingId(null);
    onReload();
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // clear error on typing
  };

  const columns = [
    { header: "ID", accessorKey: "book_id" },
    {
      header: "Title",
      accessorKey: "book_title",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <div>
            <input
              value={editValues.book_title || ""}
              onChange={(e) => handleChange("book_title", e.target.value)}
            />
            {errors.book_title && <p style={{ color: "red" }}>{errors.book_title}</p>}
          </div>
        ) : (
          row.original.book_title
        ),
    },
    {
      header: "Author",
      accessorKey: "book_author",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <div>
            <input
              value={editValues.book_author || ""}
              onChange={(e) => handleChange("book_author", e.target.value)}
            />
            {errors.book_author && <p style={{ color: "red" }}>{errors.book_author}</p>}
          </div>
        ) : (
          row.original.book_author
        ),
    },
    {
      header: "Description",
      accessorKey: "book_description",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <div>
            <textarea
              value={editValues.book_description || ""}
              onChange={(e) => handleChange("book_description", e.target.value)}
            />
            {errors.book_description && <p style={{ color: "red" }}>{errors.book_description}</p>}
          </div>
        ) : (
          row.original.book_description
        ),
    },
    {
      header: "Publisher",
      accessorKey: "book_publisher",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <input
            value={editValues.book_publisher || ""}
            onChange={(e) => handleChange("book_publisher", e.target.value)}
          />
        ) : (
          row.original.book_publisher
        ),
    },
    {
      header: "Year Published",
      accessorKey: "book_year_publish",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <div>
            <input
              type="date"
              value={editValues.book_year_publish?.slice(0, 10) || ""}
              onChange={(e) => handleChange("book_year_publish", e.target.value)}
            />
            {errors.book_year_publish && <p style={{ color: "red" }}>{errors.book_year_publish}</p>}
          </div>
        ) : (
          row.original.book_year_publish?.slice(0, 10)
        ),
    },
    {
      header: "Category",
      accessorKey: "book_category_name",
      cell: ({ row }) => {
        const book = row.original;
        if (editingId === book.book_id) {
          return (
            <div>
              <select
                value={editValues.book_category_id_fk || ""}
                onChange={(e) => handleChange("book_category_id_fk", e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.book_category_id} value={cat.book_category_id}>
                    {cat.book_category_name}
                  </option>
                ))}
              </select>
              {errors.book_category_id_fk && (
                <p style={{ color: "red" }}>{errors.book_category_id_fk}</p>
              )}
            </div>
          );
        }
        return book.book_category_name;
      },
    },
    {
      header: "Status",
      accessorKey: "book_status",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <select
            value={editValues.book_status || "y"}
            onChange={(e) => handleChange("book_status", e.target.value)}
          >
            <option value="y">Available</option>
            <option value="n">Not Available</option>
          </select>
        ) : row.original.book_status === "y" ? (
          "Available"
        ) : (
          "Not Available"
        ),
    },
    {
      header: "Inventory",
      accessorKey: "book_inventory",
      cell: ({ row }) =>
        editingId === row.original.book_id ? (
          <div>
            <input
              type="number"
              min="0"
              value={editValues.book_inventory || 0}
              onChange={(e) => handleChange("book_inventory", e.target.value)}
            />
            {errors.book_inventory && (
              <p style={{ color: "red" }}>{errors.book_inventory}</p>
            )}
          </div>
        ) : (
          row.original.book_inventory
        ),
    },
    { header: "Views", accessorKey: "book_view_count" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const book = row.original;
        return editingId === book.book_id ? (
          <>
            <button onClick={() => handleUpdate(book.book_id)}>✅ Save</button>
            <button onClick={() => setEditingId(null)}>❌ Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => handleEdit(book)}>✏️ Edit</button>
            <button onClick={() => handleDelete(book.book_id)}>🗑 Delete</button>
          </>
        );
      },
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
      {/* 🔍 Filter */}
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
