import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useState } from "react";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Cart = () => {
  const [currencyvalue, setcurrencyValue] = useState("USD");
  
  return (
    <div>
      <div className="content-container">
        <NavBar />
        <h1>Cart</h1>
      </div>
      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
};

export default Cart;
