import { Modal, Button } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { renderMatches } from "react-router";
import "./home.css";
import Footer from "../Footer/Footer";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function Home() {
  const [currencyvalue, setcurrencyValue] = useState("USD");
  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }
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
          height: "120px",
        }}
      >
        <Card.Body>
          <Card.Text
            style={{ "font-size": "50px", "font-family": "Times New Roman" }}
          >
            Welcome back, <a href="/profile">{username}</a>!
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
          height: "120px",
        }}
      >
        <Card.Body>
          <Card.Text
            style={{
              "font-size": "50px",
              "font-family": "Times New Roman",
              lineHeight: "90px",
            }}
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
      <div className="content-container">
        <NavBar />
        {userPanel}
        {currencySymbol}
        {currencyvalue}
      </div>
      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
}

export default Home;


