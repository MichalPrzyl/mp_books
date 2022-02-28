import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';



const AddBookModal = (props:any) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    
    
    const handleClose = async() => {
        setShow(false);
        props.refreshData()
    }

    const handleSubmit = async() =>{
        const sendState = {
            title: inputTitle,
            author: inputAuthor
        }
        const response = await axios.post(`http://localhost:8000/books`, sendState)
        handleClose()
    }

    const [ inputTitle, setInputTitle ] = useState<string>("")
    const [ inputAuthor, setInputAuthor ] = useState<string>("")
    return (
        <>
            <Button className={props.className} variant="primary" onClick={handleShow}>
                Dodaj
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj książkę</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder='tytuł' onChange={(e) =>setInputTitle(e.target.value)}></input>               
                    <input type="text" placeholder='autor' onChange={(e) =>setInputAuthor(e.target.value)}></input>               
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AddBookModal;