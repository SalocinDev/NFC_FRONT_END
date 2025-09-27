import { useEffect, useState } from "react";
import { Table, SearchID } from "../.."; 
import api from "../../../api/api";

function ServicesAvailed() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = records.filter((record) =>
    record.service_id?.toString().includes(searchTerm) ||
    record.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.date?.toString().includes(searchTerm)
  );

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await api.get(`/servicelogs/${storedUser.user_id}`); 
        setRecords(res.data);   
      } catch (err) {
        console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, [storedUser.user_id]);

  if (loading) return <p>Loading returned books...</p>;

  return (
    <div>
       <SearchID placeholder="Search by Services"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         />
      <Table records={searchTerm ? filteredRecords : records} />
    </div>
  );
}

export default ServicesAvailed;
