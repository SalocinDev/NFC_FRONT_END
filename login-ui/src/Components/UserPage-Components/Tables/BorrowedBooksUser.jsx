import { useEffect, useState } from "react";
import { Table, SearchID } from "../.."; 
import api from "../../../api/api";
import classes from "../../../CSS-Folder/Table.module.css";


function BorrowedBooksTable() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = records.filter((record) =>
    record.book_title?.toString().includes(searchTerm) ||
    record.book_author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.book_publisher?.toString().includes(searchTerm)
  );

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await api.get(`/borrowing/${storedUser.user_id}`); 
        // console.log(res);
        // console.log(res.data);
        if (res.status === 204) {
          return;
        }
        if (res.status === 200) {
          setRecords(res.data);
          return;
        }
      } catch (err) {
        // console.error("Error fetching borrowed books:", err);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, []);

  if (loading) return <p>Loading returned books...</p>;
  
  return (
  <div>
    <div className={classes.BorrowedBooksContainer}>     
      <SearchID placeholder="Search by Book Name/Author"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
        />
    <Table records={searchTerm ? filteredRecords : records}
    containerClass={classes.BorrowedTable}
    mobilePageSize = {2} />
    </div>
  </div>
  );
}

export default BorrowedBooksTable;