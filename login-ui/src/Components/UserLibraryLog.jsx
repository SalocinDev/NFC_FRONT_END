import React, { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { GrCaretNext, GrChapterNext, GrCaretPrevious, GrChapterPrevious } from "react-icons/gr";
import classes from "../CSS-Folder/UserLibraryLog.module.css";
import { TbReload, TbSearch } from "react-icons/tb";
import { Button } from '../Components';
import api from "../api/api";

const UserLibraryLog = () => {
  const [logs, setLogs] = useState([]);
  const [searchType, setSearchType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);

  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/UserLibraryLog", {
        params: { searchType, searchValue },
      });
      setLogs(res.data || []);
      setPage(1);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return logs.slice(start, start + rowsPerPage);
  }, [logs, page, rowsPerPage]);

  // Search on Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchLogs();
  };

  const columns = useMemo(
    () => [
      { header: "Log ID", accessorKey: "log_id" },
      { header: "User Name", accessorKey: "user_fullname" },
      { header: "Service Name", accessorKey: "service_name" },
      {
        header: "Log Time",
        accessorKey: "log_time",
        cell: (info) =>
          new Date(info.getValue()).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
      },
    ],
    []
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <h2>User Library Logs</h2>

      {/* Search & Controls */}
      <div className={classes.InputDiv}>
        <div className={classes.SelectDiv}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            {/*<option value="all">All</option>*/}
            <option value="user">By User</option>
            <option value="service">By Service</option>
          </select>
          <div className={classes.ButtonContainer}>
            <Button
              onClick={fetchLogs}
              name={<><TbSearch size={23} /></>}
              use="SearchLogs"
            />
            <Button
              onClick={fetchLogs}
              name={<><TbReload size={24} /></>}
              use="ReloadLogs"
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />


      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {isSorted === "asc"
                        ? " 🔼"
                        : isSorted === "desc"
                          ? " 🔽"
                          : ""}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {!loading && (
        <div>

          <Button
            use="FirstPageTable"
            name={<><GrChapterPrevious size={20}
            /></>}
            onClick={() => setPage(1)}
            disabled={page === 1}
          />

          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            use="PreviousPageButton"
            name={<><GrCaretPrevious size={20}
            /></>}
          />

          <span className={classes.PageCount}>
            Page {page} of {totalPages || 1}
          </span>

          <Button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            use="PreviousPageButton"
            name={<><GrCaretNext size={20}
            /></>}
          />
          <Button
            use="LastPageTable"
            name={<><GrChapterNext size={20}
            /></>}
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages || totalPages === 0}


          />
        </div>
      )}
    </div>
  );
};

export default UserLibraryLog;
