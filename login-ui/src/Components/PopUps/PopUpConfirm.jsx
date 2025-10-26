import { useState, useEffect } from "react";
import classes from "../../CSS-Folder/PopUpConfirm.module.css";
import { logOut } from '../../Services/SessionUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "..";
import { useNavigate } from "react-router-dom";

function PopUpConfirm({ 
    isOpen, 
    onClose, 
    onConfirm,
    subject,
    selectedCount = 0 
    }) {
    const navigate = useNavigate();

    const [confirmState, setConfirmState] = useState("");

    if (!isOpen) return null;

    const handleConfirm = (e) => {
        e.preventDefault();
        onConfirm();
    };
    
    const handleLogout = async () => {
        try {
            // toast.success("Gipindot ang handleLogout")
            await logOut();
            navigate("/");
            return toast.success("Logout Complete")
        } catch (error) {
            return toast.error("Logout Error")
        }
    }
    // useEffect(() => {
    //     if (subject != "Confirm Logout?") {
            
    //     }
    // },[])

    return (
        // <div className={classes.PopupOverlay}>
        //     <div className={classes.PopupBox}>
        //         <form onSubmit={handleConfirm}>
        //             <h1>Confirm {subject}</h1>
        //             { subject === "Logout" ? (
        //                 <div className={classes.PopupButtons}>

        //                     <Button use="CancelDelete" name="Cancel" onClick={onClose} />
        //                     <Button use="ConfirmDelete" name="Logout" type="submit"/>
        //                 </div>
        //             ) : subject === "Logout/Continue" ? (
        //                 <div className={classes.PopupButtons}>

        //                     <Button use="CancelDelete" name="Logout" type="submit" />
        //                     <Button use="ConfirmDelete" name="Continue" type="submit"/>
        //                 </div>
        //             ) : (
        //                 <div className={classes.PopupButtons}>

        //                     <Button className={classes.PopupButtons} use="CancelDelete" name="Cancel" onClick={onClose} />
        //                     <Button use="ConfirmDelete" name="Logout" type="submit"/>
        //                 </div>
        //             )
        //             }
        //         </form>
        //     </div>
        // </div>
        <div className={classes.PopupOverlay}>
            <div className={classes.PopupBox}>
                <h2>{subject}</h2>
                <div className={classes.PopupButtons}>
                    <form onSubmit={handleConfirm}>
                        <div className={classes.formgroup}>
                            { subject === "Confirm Logout?" ? (
                                <>             
                                    <Button
                                        name="Cancel"
                                        use="CancelServicesButton"
                                        onClick={onClose}
                                    />
                                    <Button
                                        name="Logout"
                                        use="ConfirmServicesButton"
                                        type="submit"
                                        />
                                </>
                            ) : subject === "Logout/Continue?" ? ( 
                                <>             
                                    <Button
                                        name="Logout"
                                        use="CancelServicesButton"
                                        onClick={handleLogout}
                                        />
                                    <Button
                                        name="Continue"
                                        use="ConfirmServicesButton"
                                        type="submit"
                                        />
                                </>
                            ) : (
                                <>             
                                    <Button
                                        name="Cancel"
                                        use="CancelServicesButton"
                                        onClick={onClose}
                                        />
                                    <Button
                                        name="Logout"
                                        use="ConfirmServicesButton"
                                        type="submit"
                                        />
                                </>
                            )
                        }
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default PopUpConfirm;
