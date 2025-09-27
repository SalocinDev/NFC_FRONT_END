import { useEffect, useState } from "react";
import { Table, SearchID } from "../.."; 
import api from "../../../api/api";

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
        <SearchID placeholder="Search by Book Name/Author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         />
      <Table records={searchTerm ? filteredRecords : records} />
    </div>
  );
}

export default ReturnedBooksTable;


