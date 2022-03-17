import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import "./home.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import HeartIcon from "@mui/icons-material/Favorite";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

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

      <Card.Body>
        <Card.Text style={{ fontSize: "50px", fontFamily: "Times New Roman" }}>
          Welcome back, <a href="/profile">{username}</a>!
        </Card.Text>
      </Card.Body>
    );
  } else {
    userPanel = (
      //   <div>
      //     <center>
      //       <h1>Explore one-of-a-kind finds from independent makers</h1>
      //     </center>
      //   </div>

      <Card.Body>
        <Card.Text
          style={{
            fontSize: "50px",
            fontFamily: "Times New Roman",
            lineHeight: "90px",
          }}
        >
          Explore one-of-a-kind finds from independent makers
        </Card.Text>
      </Card.Body>
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
  const [itemData, setItemData] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const fetchItemImages = async () => {
    await axios.get("http://localhost:8000/getProducts").then((response) => {
      setItemData(response.data);
      // itemData = JSON.parse(itemData);
    });
  };
  const fetchUserDetails = async () => {
    await axios.get("http://localhost:8000/home").then((response) => {
      var stringify = JSON.stringify(response.data.user_details[0].Name);
      setUsername(stringify.slice(1, -1));
      // setUserPanel;
    });
  };
  useEffect(() => {
    fetchUserDetails();
    fetchItemImages();
  }, []);

  const displayProduct = (e) => {
    navigate("/product", {
      state: e.target.name,
    });
  };

  return (
    <div>
      <div className="content-container" style={{ height: "1500px" }}>
        <NavBar />
        <Card
          style={{
            textAlign: "center",
            background: "#fdebd2",
            height: "120px",
          }}
        >
          {userPanel}
        </Card>
        {/* {currencySymbol}
        {currencyvalue} */}

        <ImageList sx={{ padding: "60px" }}>
          <ImageListItem key="Subheader" cols={4}></ImageListItem>
          {itemData.map((item) => (
            <ImageListItem
              key={item.ItemImage}
              style={{ padding: 10, width: "100%" }}
            >
              <img
                src={item.ItemImage}
                srcSet={item.ItemImage}
                alt={item.ItemName}
                name={item.ItemId}
                loading="lazy"
                onClick={displayProduct}
              />
              <ImageListItemBar
                title={item.ItemName}
                subtitle={item.Price}
                position="below"
                actionIcon={
                  <IconButton sx={{ color: "#ff0000" }}>
                    <HeartIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
}

export default Home;
