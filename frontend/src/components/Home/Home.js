import { Modal, Button } from 'react-bootstrap';
import Login from '../Login/Login';
import React, {useState} from 'react';

function Home(){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return(
        <div>
            <div>
                <Button onClick = {handleShow} className = "btn btn-success">Sign In</Button>
            </div>

            <Modal show = {show}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Login />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
            
        </div> 
    )
}

export default Home;