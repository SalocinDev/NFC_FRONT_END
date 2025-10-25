import classes from '../../CSS-Folder/UserManagement.module.css';
import { Button, Table, PopUpNfc, SearchID, RegisterUser } from '..';
import PopUpFormDeleteConfirm from '../PopUps/PopUpDeleteConfirm';
import { useState, useEffect } from 'react';
import { TiUserAddOutline, TiUserDeleteOutline } from "react-icons/ti";
import api from "../../api/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
    const [userRecords, setUserRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRowsData, setSelectedRowsData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        const fetchUsersAndCategories = async () => {
            try {
                // Fetch both users and categories in parallel
                const [usersRes, categoriesRes] = await Promise.all([
                    api.get("/user/"),
                    api.get("/user/categories/")
                ]);

                // Map categories by ID for easy lookup
                const categoriesMap = {};
                categoriesRes.data.forEach(cat => {
                    categoriesMap[cat.user_category_id] = cat.user_category_name;
                });

                // Merge category names into user records
                const usersWithCategory = usersRes.data.map(user => ({
                    ...user,
                    user_category_name: categoriesMap[user.user_category_id_fk] || "Unknown"
                }));

                // Sort by log_time descending
                const sorted = usersWithCategory.sort(
                    (a, b) => new Date(b.log_time) - new Date(a.log_time)
                );
                setUserRecords(sorted);
            } catch (err) {
                console.error("Error fetching users or categories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsersAndCategories();
    }, []);

    if (loading) return <p>Loading users...</p>;

    const handleOpenRegister = () => setIsRegisterPopupOpen(true);
    const handleCloseRegister = () => setIsRegisterPopupOpen(false);

    const handleViewRow = (rowData) => {
        setSelectedRow(rowData);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => setIsPopupOpen(false);

    const handleDeleteUser = () => {
        if (!selectedRowsData || selectedRowsData.length === 0) return toast.error("No row selected.");
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete("/user/", { data: selectedRowsData });
            // console.log(`Deleting Users: ${selectedRowsData}`);

            setUserRecords((prev) => prev.filter(u => !selectedRowsData.includes(u.user_id)));

            setSelectedRowsData([]);
            setSelectedRow(null);
            setIsDeleteConfirmOpen(false);

            toast.success("Selected user(s) deleted successfully");
        } catch (err) {
            console.error("Failed to delete users:", err);
            toast.error("Failed to delete users");
        }
    };

    return (
        <div>
            <div className={classes.samplelang}>
                <SearchID placeholder="Search by User Name" />
                <Button use="RegisterUser" name={<TiUserAddOutline size={24} />} onClick={handleOpenRegister} />
                <Button use="DeleteUser" name={<TiUserDeleteOutline size={25} />} onClick={handleDeleteUser} />
            </div>

            <div className={classes.TableContainer}>
                <main className={classes.RenderComponents}>
                    <Table
                        checkbox
                        view
                        records={userRecords}
                        onViewRow={handleViewRow}
                        onSelectedRowsChange={(rows) => {
                            const selectedIds = Object.keys(rows)
                                .filter(id => rows[id])
                                .map(id => {
                                    const index = parseInt(id.replace("row-", ""));
                                    return userRecords[index]?.user_id;
                                })
                                .filter(Boolean);
                            setSelectedRowsData(selectedIds);
                            setSelectedRow(selectedIds.length === 1 ? { user_id: selectedIds[0] } : null);
                        }}
                        columns={[
                            { accessorKey: "user_id", header: "ID" },
                            { accessorKey: "user_email", header: "EMAIL" },
                            { accessorKey: "user_firstname", header: "FIRSTNAME" },
                            { accessorKey: "user_middlename", header: "MIDDLENAME" },
                            { accessorKey: "user_lastname", header: "LASTNAME"},
                            { accessorKey: "user_date_of_birth", header: "DATE OF BIRTH" },
                            { accessorKey: "user_gender", header: "GENDER" },
                            { accessorKey: "user_contact_number", header: "CONTACT" },
                            { accessorKey: "user_category_name", header: "USER CATEGORY" },
                            { accessorKey: "user_school", header: "UNIVERSITY" },
                            { accessorKey: "user_creation_time", header: "CREATION DATE" },
                        ]}
                    />
                </main>
            </div>

            <PopUpNfc
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                columns={userRecords.length > 0 ? Object.keys(userRecords[0]) : []}
                initialValues={selectedRow || {}}
                onSubmit={() => setIsPopupOpen(false)}
            />

            <RegisterUser
                isOpen={isRegisterPopupOpen}
                onClose={handleCloseRegister}
            />

            <PopUpFormDeleteConfirm
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                selectedCount={selectedRowsData.length}
            />
        </div>
    );
}

export default UserManagement;
