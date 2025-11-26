import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Button } from "../Components";
import classes from '../CSS-Folder/ServiceManageTable.module.css';
import ServiceModal from "./ServiceModal";
import ServiceForm from "./ServiceForm";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import {
  GrCaretNext,
  GrChapterNext,
  GrCaretPrevious,
  GrChapterPrevious,
} from "react-icons/gr";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

function ServiceManageTable() {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Table state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchServices = async () => {
    try {
      const res = await api.get("/libraryservices");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await api.delete(`/libraryservices/${id}`);
      fetchServices();
    }
  };

  const submitForm = async (data) => {
    try {
      if (editData) {
        await api.put(`/libraryservices/${editData.library_service_id}`, data);
      } else {
        await api.post("/libraryservices", data);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error("Failed to save service:", err);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("library_service_id", { header: "ID" }),
    columnHelper.accessor("library_service_name", { header: "Name" }),
    columnHelper.accessor("library_service_status", { header: "Status" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className={classes.ButtonContainer}>
          <Button 
          name={
          <>
          < FaEdit size={25} />
          <span>Edit</span>
          </>
          }
          use="EditButton"
          onClick={() => handleEdit(row.original)} 
          />

          <Button  
          name={
          <>
          <MdOutlineDelete size={25} />
          <span>Delete</span>
          </>
          }
          use="DeleteButtonServices"
          onClick={() => handleDelete(row.original.library_service_id)}
          />
           
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: services,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h2>Library Services</h2>
      <div className={classes.InputContainer}>
        
        <input
          placeholder="Search services..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <Button onClick={handleAdd}
          use="AddServices"
          name={
            <>
              <MdOutlineAdd size={20} />
              <span>Add Services</span>
            </>
          }
        />
        
      </div>

      {/* Global Filter */}


      {/* Table */}
      <table className="w-full border-collapse border mt-2">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center gap-4 mt-4">
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

      {/* Modal */}
      <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ServiceForm
          initialValues={editData}
          onSubmit={submitForm}
          onCancel={() => setModalOpen(false)}
        />
      </ServiceModal>
    </div>
  );
}

export default ServiceManageTable;
