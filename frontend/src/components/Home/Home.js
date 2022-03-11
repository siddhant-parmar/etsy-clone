import { Modal, Button } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { renderMatches } from "react-router";

function Home() {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  let userPanel = null;
  if (cookie.load("cookie")) {
    userPanel = (
      //   <div>
      //     <center>
      //       <h1>Welcome back, {username}!</h1>
      //     </center>
      //   </div>
      <Card
        style={{
          "text-align": "center",
          background: "#fdebd2",
          height: "200px",
        }}
      >
        <Card.Body>
          <Card.Text
            style={{ "font-size": "50px", "font-family": "Times New Roman" }}
          >
            Welcome back, {username}!
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    userPanel = (
      //   <div>
      //     <center>
      //       <h1>Explore one-of-a-kind finds from independent makers</h1>
      //     </center>
      //   </div>
      <Card
        style={{
          "text-align": "center",
          background: "#fdebd2",
          height: "200px",
        }}
      >
        <Card.Body>
          <Card.Text
            style={{ "font-size": "50px", "font-family": "Times New Roman" }}
          >
            Explore one-of-a-kind finds from independent makers
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  // setUserPanel = () => {
  //     if(cookie.load('cookie')){
  //         userPanel =
  //         <div>
  //             <center><h1>Welcome back, {username}!</h1></center>
  //         </div>
  //     }
  // }
  useEffect(() => {
    axios.get("http://localhost:8000/home").then((response) => {
      var stringify = JSON.stringify(response.data.user_details[0].Name);
      console.log(stringify);
      setUsername(stringify.slice(1, -1));
      // setUserPanel;
    });
  }, []);
  return (
    <div>
      <NavBar />
      {userPanel}
    </div>
  );
}

export default Home;
