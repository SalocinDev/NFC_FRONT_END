import { useEffect, useState } from "react";
import { Table } from "../.."; 
import api from "../../../api/api";

function BorrowedBooksAdmin() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  
    useEffect(() => {
      const fetchBorrowedBooks = async () => {
        try {
          const res = await api.get(`/borrowing/`); 
          const sorted = res.data.sort(
            (a, b) => new Date(b.log_time) - new Date(a.log_time)
          );
          setRecords(sorted);
        } catch (err) {
          console.error("Error fetching borrowed books:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBorrowedBooks();
    }, []);
  
    if (loading) return <p>Loading borrowed books...</p>;
  
  
  return (
    <div>
        <Table records={records}/>
    </div>
  );
}

export default BorrowedBooksAdmin;