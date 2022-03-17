import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../responsive";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Product = () => {
  const [currencyvalue, setcurrencyValue] = useState("USD");
  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }
  //   const itemdetails1 = {
  //     ImageId: 10,
  //     ImageName: "ITEM",
  //   };
  const [itemDetails, setItemDetails] = useState({});
  const [itemCount, setItemCount] = useState(1);
  const { state } = useLocation();

  useEffect(() => {
    const fetchProductData = async () => {
      await axios
        .get("http://localhost:8000/productDetails", {
          params: { ItemId: state },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data[0]);
            setItemDetails(response.data[0]);
          }
        });
    };
    fetchProductData().catch(console.error);
    console.log(itemDetails);
  }, [state]);

  let qtyarray = [];
  for (var i = 1; i <= itemDetails.QuantityAvailable; i++) {
    qtyarray.push(i);
  }
  const Container = styled.div``;

  const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
  `;

  const ImgContainer = styled.div`
    flex: 1;
  `;

  const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
  `;

  const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
  `;

  const Title = styled.h1`
    font-weight: 200;
  `;

  const Desc = styled.p`
    margin: 20px 0px;
  `;

  const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
  `;

  const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
  `;

  const Filter = styled.div`
    display: flex;
    align-items: center;
  `;

  const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
  `;

  const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
  `;

  const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
  `;

  const FilterSizeOption = styled.option``;

  const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
  `;

  const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
  `;

  const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
  `;
  return (
    <div>
      <Container>
        <NavBar />
        <Wrapper>
          <ImgContainer>
            <img style={{ width: "100%" }} src={itemDetails.ItemImage} />
          </ImgContainer>
          <InfoContainer>
            <Title>{itemDetails.ItemName}</Title>
            <p>{itemDetails.QuantitySold} Sales</p>
            <Desc>{itemDetails.Description}</Desc>
            <Price>$ {itemDetails.Price}</Price>
            <Container>
              <h3>
                <label for="qty">Quantity</label>
              </h3>

              <select style={{ width: "60%" }}>
                {qtyarray.map((num) => (
                  <option>{num}</option>
                ))}
              </select>
            </Container>
            <br />
            <br />
            <Container>
              <Button
                variant="dark"
                type="submit"
                style={{ height: "40px", width: "500px" }}
              >
                Buy it Now
              </Button>
            </Container>
            <br />
            <br />
            <Container>
              <Button
                variant="dark"
                type="submit"
                style={{ height: "40px", width: "500px" }}
              >
                Add To Cart
              </Button>
            </Container>
          </InfoContainer>
        </Wrapper>
        {/* <Footer /> */}
      </Container>
      <div className="footer--pin">
        <Footer setcurrencyValue={setcurrencyValue} />
      </div>
    </div>
  );
};

export default Product;
