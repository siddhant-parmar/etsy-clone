import { Modal, Button } from 'react-bootstrap';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import React, {useState} from 'react';

function Home(){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => {
        setShow1(true);
        setShow(false);
    }
    const handleClose1 = () => setShow1(false);
    
    return(
        <div>
            <div class="grid-container">
                <header class="row">
                    <div>
                    <a class="brand" href="/">Etsy</a>
                    </div>
                    <div>
                    <div>
                        <Button onClick = {handleShow} className = "btn btn-success">Sign In</Button>
                    </div>

                    <Modal show = {show}>
                        <Modal.Header>
                            <Modal.Title>Sign in</Modal.Title>
                            <Button variant="primary" onClick = {handleShow1}>Register</Button>
                        </Modal.Header>

                        <Modal.Body>
                            <Login />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick = {handleClose} >Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <a href="/">Cart</a>
                    </div>

                    <div>
                    <Modal show = {show1}>
                        <Modal.Header>
                            <Modal.Title>Create your account</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Signup />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick = {handleClose1} >Close</Button>
                        </Modal.Footer>
                    </Modal>
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