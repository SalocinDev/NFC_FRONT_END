import classes from '/src/CSS-Folder/Modal.module.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { handleLoginClick } from '../Services/LoginService.js';
import { Button } from '../Components';


function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal (!modal)
    }

  return (

    <div>
        <Button name="CANCEL" use="ButtonVerify" onClick={toggleModal} />
        <Button name="CONFIRM" use="ButtonVerify" onClick={toggleModal} />
        
        <div className="modal">
            <div className="overlay"></div>
            <div className="ModalContent">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consequuntur fuga ipsa excepturi, tenetur dolorum totam magni quibusdam deserunt explicabo ducimus enim eaque eos tempore dolorem doloremque voluptate dolores deleniti.
                </p>
            </div>
        </div>

    </div>
  );
}

export default Modal;
