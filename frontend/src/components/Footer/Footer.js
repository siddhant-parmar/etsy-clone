import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import CurrencyModal from "../Currency/currencyModal";
import CopyrightIcon from "@mui/icons-material/Copyright";
function Footer({ setcurrencyValue }) {
  const [currencyvalue, setCurrencyValue] = useState("USD");

  setcurrencyValue(currencyvalue);
  return (
    <>
      <div
        style={{
          background: "#4c6bc6",
          fontFamily: "Times New Roman",
          textAlign: "center",
          lineHeight: "50px",
          height: "50px",
          color: "white",
          fontSize: "14px",
        }}
      >
        Etsy is powered by 100% renewable electricity.
      </div>
      <div
        style={{
          background: "#2f456c",
          height: "300px",
        }}
      ></div>
      <Navbar
        variant="dark"
        expand="sm"
        style={{ height: "80px", backgroundColor: "#232347" }}
      >
        <Container fluid>
          {/* <Navbar.Brand href="#">
            <h2 style={{ color: "red" }}>&nbsp;&nbsp;&nbsp; Etsy</h2>
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="container-fluid"
              style={{ maxHeight: "100px" }}
              navbarScroll
              //className="ml-auto"
            >
              <Nav.Link>
                <CurrencyModal setCurrencyValue={setCurrencyValue} />
              </Nav.Link>
              <Navbar.Text
                className="border-left pl-2 ms-auto"
                style={{ color: "white" , lineHeight:"80px"}}
              >
                <CopyrightIcon /> 2022 Etsy, inc.
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
// render(<Home />);
export default Footer;
