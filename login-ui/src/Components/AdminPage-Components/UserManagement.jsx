// UserManagement.jsx
import classes from '../../CSS-Folder/UserManagement.module.css';
import { Button, Table, PopUpNfc, SearchID } from '..';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TiUserAddOutline, TiUserDeleteOutline  } from "react-icons/ti";
import api from "../../api/api";

function UserManagement() {
  const navigate = useNavigate(); 
  const [userRecords, setUserRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/user/`);
        const sorted = res.data.sort(
          (a, b) => new Date(b.log_time) - new Date(a.log_time)
        );
        setUserRecords(sorted);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  const handleViewRow = (rowData) => {
    setSelectedRow(rowData);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRow(null);
  };

  const handleSubmitPopup = (formData) => {
    console.log("Submitted popup data:", formData);
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className={classes.samplelang}>
        <SearchID placeholder="Search by User Name" />
        <Button 
        use="RegisterUser" 
        name={<><TiUserAddOutline size={24} /></>} />
        <Button 
        use="DeleteUser" 
        name={<><TiUserDeleteOutline size={25} /></>} />
      </div>
      <div className={classes.TableContainer}>
        <main className={classes.RenderComponents}>
          <Table
            checkbox
            view
            records={userRecords}
            onViewRow={handleViewRow} 
          />
        </main>
      </div>

      <PopUpNfc
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        columns={userRecords.length > 0 ? Object.keys(userRecords[0]) : []}
        initialValues={selectedRow || {}}
        onSubmit={handleSubmitPopup}
      />
    </div>
  );
}

export default UserManagement;
