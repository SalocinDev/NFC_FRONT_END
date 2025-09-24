import { useEffect, useState } from "react";
import { Table } from "../.."; 
import api from "../../../api/api";

function BooksAdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await api.get(`/books/`); 
        const sorted = res.data.sort(
          (a, b) => new Date(b.log_time) - new Date(a.log_time)
        );
        setRecords(sorted);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <Table records={records} />
    </div>
  );
}

export default BooksAdmin;


