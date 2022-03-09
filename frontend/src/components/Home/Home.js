import { Modal, Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Home(){
    axios.defaults.withCredentials = true;

    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/home").then((response) => {
            var stringify = JSON.stringify(response.data.user_details[0].Name);
            console.log(stringify);
            setUsername(stringify);
        });
    }, [])
    return(
        <div>
            <NavBar />
            <h1>Welcome {username}</h1>
        </div>    
    )
}

export default Home;