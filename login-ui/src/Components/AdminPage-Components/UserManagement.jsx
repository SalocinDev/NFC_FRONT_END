// UserManagement.jsx
import classes from '../../CSS-Folder/UserManagement.module.css';
import { Button, Table, PopUpNfc, SearchID, RegisterUser } from '..';
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
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterPopupOpen(true);
  const handleCloseRegister = () => setIsRegisterPopupOpen(false);


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
        name={<><TiUserAddOutline size={24} /></>}
        onClick={handleOpenRegister}
        />

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
            columns={[
              { accessorKey: "user_id", header: "ID" },
              { accessorKey: "user_email", header: "EMAIL" },
              { accessorKey: "user_firstname", header: "FIRSTNAME" },
              { accessorKey: "user_middlename", header: "MIDDLENAME" },
              { accessorKey: "user_date_of_birth", header: "DATE OF BIRTH" },
              { accessorKey: "user_gender", header: "GENDER" },
              { accessorKey: "user_contact_number", header: "CONTACT" },
              { accessorKey: "user_category_id_fk", header: "USER CATEGORY" },
              { accessorKey: "user_school", header: "UNIVERSITY" },
              { accessorKey: "user_creation_time", header: "CREATION DATE" }
            ]}
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

      <RegisterUser
        isOpen={isRegisterPopupOpen}
        onClose={handleCloseRegister}
      />
    </div>
  );
}

export default UserManagement;
