import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useState } from "react";

const Favourite = () => {
  const [currencyvalue, setcurrencyValue] = useState("USD");
  return (
    <div>
      <div className="content-container">
        <NavBar />
        <h1>Favourites</h1>
      </div>
      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
};

export default Favourite;
