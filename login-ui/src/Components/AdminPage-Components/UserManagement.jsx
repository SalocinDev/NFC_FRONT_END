import classes from '../../CSS-Folder/Books.module.css';
import { Button, Table, PopUpForm, PopUpFormDeleteConfirm } from '..';
import { useState, useEffect } from 'react';
import api from '../../api/api';
import { BiSolidEditAlt, BiUserPlus } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function UserManagement() {
  const storedUser = JSON.parse(sessionStorage.getItem('userInfo'));
  const [userRecords, setUserRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [action, setAction] = useState(null);

  //Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get(`/user/?role=${storedUser.role}`);
      setUserRecords(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Generate columns dynamically
  const userColumns = userRecords.length > 0 ? Object.keys(userRecords[0]) : [];

  //Handle add/edit form submission
  const handleFormSubmit = async (formValues, action) => {
    if (!formValues || !action) {
      alert('Invalid form submission');
      return;
    }

    try {
      if (action === 'add') {
        const res = await api.post('/user', formValues);
        alert(res.data.message);
      } else if (action === 'edit') {
        const selectedIndexes = Object.keys(selectedRows).filter(idx => selectedRows[idx]);
        const selectedIds = selectedIndexes.map(idx => userRecords[idx].user_id);
        if (selectedIds.length !== 1) {
          alert('Please select exactly one user to edit.');
          return;
        }
        const res = await api.put(`/user${selectedIds[0]}`, formValues);
        alert(res.data.message);
      }

      fetchUsers();
      setIsOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit form');
    }
  };

  //Handle delete confirmation
  const handleDeleteConfirm = async () => {
    const selectedIndexes = Object.keys(selectedRows).filter(idx => selectedRows[idx]);
    const selectedIds = selectedIndexes.map(idx => userRecords[idx].user_id);

    if (selectedIds.length === 0) {
      alert('Please select at least one user to delete.');
      return;
    }
    
    try {
      const res = await api.delete('/user', { data: selectedIds });
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete users');
    }

    setIsOpenDeleteConfirm(false);
  };

  return (
    <div>
      <div className={classes.samplelang}>
        <Button
          name={<BiSolidEditAlt size={24} />}
          use="EDAButton"
          onClick={() => {
            const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
            if (selectedIds.length !== 1) {
              alert('Please select exactly one user to edit.');
              return;
            }
            setAction('edit');
            setIsOpen(true);
          }}
        />

        <Button
          name={<BiUserPlus size={24} />}
          use="EDAButton"
          onClick={() => {
            setAction('add');
            setIsOpen(true);
          }}
        />

        <Button
          name={<MdOutlineDeleteOutline size={24} />}
          use="DeleteButton"
          onClick={() => {
            const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
            if (selectedIds.length === 0) {
              alert('Please select a user to delete.');
              return;
            }
            setAction('delete');
            setIsOpenDeleteConfirm(true);
          }}
        />
      </div>

      <div className={classes.TableContainer}>
        <main className={classes.RenderComponents}>
          <Table
            key="UsersAdmin"
            records={userRecords}
            onSelectedRowsChange={setSelectedRows}
            checkbox
            hiddenColumns={['password']}
          />
        </main>
      </div>

      <PopUpForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        columns={userColumns.slice(1)}
        initialValues={{}}
        onSubmit={(formValues) => handleFormSubmit(formValues, action)}
      />

      <PopUpFormDeleteConfirm
        isOpen={isOpenDeleteConfirm}
        onClose={() => setIsOpenDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default UserManagement;
