import { useEffect, useState } from "react";
import { Table, SearchID } from "../.."; 
import api from "../../../api/api";
import classes from "../../../CSS-Folder/Table.module.css";

function ReturnedBooksTable() {
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
        const res = await api.get(`/returning/${storedUser.user_id}`); 
        if (data.status === '204') {
          return;
        }
        if (data.status === '200') {
          setRecords(res.data);
        }
      } catch (err) {
        return;
        // console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, []);

  if (loading) return <p>Loading returned books...</p>;

  return (
    <div>
       

      <div className={classes.ReturnedBooksContainer}> 

       <SearchID placeholder="Search by Book Name/Author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         />

      <Table records={searchTerm ? filteredRecords : records}
      containerClass={classes.ReturnedTable}
      />
      </div>
    </div>
  );
}

export default ReturnedBooksTable;


