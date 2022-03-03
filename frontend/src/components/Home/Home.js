import { Modal, Button } from 'react-bootstrap';
import Login from '../Login/Login';
import React, {useState} from 'react';
import axios from 'axios';

function Home(){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const tempFn = () => {
        var data = {
            Email: "admin",
            Password: "password"
        }
    
        
        axios.post('http://localhost:8000/login', data).then((response) => {
            if (response.status === 200) {
                
            }
    
        });
    }

    return(
        <div>
            <div class="grid-container">
                <header class="row">
                    <div>
                    <a class="brand" href="/">Etsy</a>
                    </div>
                    <div>
                    <div>
                        <Button onClick = {tempFn} className = "btn btn-success">Sign In</Button>
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
                    <a href="/">Cart</a>
                    </div>
                </header>
                <main>
                    <ul>
                    <li>Product 1</li>
                    <li>Product 2</li>
                    <li>Product 3</li>
                    <li>Product 4</li>
                    </ul>
                </main>
            <footer class="row left">United States | English (US) | $ (USD)</footer>
            </div>
            
        </div> 
            
    )
}

export default Home;