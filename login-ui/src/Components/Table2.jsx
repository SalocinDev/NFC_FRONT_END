import classes from '../CSS-Folder/Table2.module.css';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import api from "../api/api";

const Table2 = () => {

     useEffect(() => {
    api.get("/borrowing").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      
      <h1>Testing if it works</h1>
      <th></th>
      <tr>
      <td>testing</td>
      </tr>
    </div>
  );
};


export default Table2;
