import { useEffect, useState } from "react";
import { Table } from "../.."; 
import api from "../../../api/api";

function BorrowedBooksTable() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  
    useEffect(() => {
      const fetchReturnedBooks = async () => {
        try {
          const res = await api.get(`/borrowing/${storedUser.user_id}`); 
          setRecords(res.data);
        } catch (err) {
          console.error("Error fetching borrowed books:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReturnedBooks();
    }, []);
  
    if (loading) return <p>Loading returned books...</p>;
  
  
  return (
    <div>
        <Table records={records}/>
    </div>
  );
}

export default BorrowedBooksTable;