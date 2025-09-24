import { useEffect, useState } from "react";
import { Table } from "../.."; 
import api from "../../../api/api";

function Users() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/user/`);
        const sorted = res.data.sort(
          (a, b) => new Date(b.log_time) - new Date(a.log_time)
        );
        setRecords(sorted);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <Table records={records} />
    </div>
  );
}

export default Users;


