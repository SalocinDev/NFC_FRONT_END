import { useEffect, useState } from "react";
import { Table } from "../.."; 
import api from "../../../api/api";

function ReturnedBooksTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await api.get(`/returning/${storedUser.user_id}`); 
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, []);

  if (loading) return <p>Loading returned books...</p>;

  return (
    <div>
      <Table records={records} />
    </div>
  );
}

export default ReturnedBooksTable;


