import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  Dropdown
} from "react-bootstrap";
import LoginSignupButton from "../Pages/LoginSignupButton";
import LogoutSignoutButton from "../Pages/LogoutSignoutButton";
import cookie from 'react-cookies';

class NavBar extends Component{
  render(){
    let LoginOutButton = null;
    let Favourite = null;
    if(cookie.load('cookie')){
      console.log("Able to read cookie");
      Favourite = 
        <div>
            <Nav.Link className="border-left pl-2 ms-auto" href="/favourite">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="26" 
                height="26" 
                fill="currentColor" 
                class="bi bi-heart" 
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </Nav.Link>
        </div>
      LoginOutButton = 
      <Dropdown className="border-left pl-2 ms-auto">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="">
            <LogoutSignoutButton />
          </Dropdown.Item>
          <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
    else{
      console.log("Not able to read cookie");
      LoginOutButton = 
      <Nav.Link className="border-left pl-2 ms-auto" href="">
        <LoginSignupButton />
      </Nav.Link>
      
    }
    return (
      <>
        <div></div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/home">
              <h1 style={{ color: "#f1641d" }}>&nbsp;&nbsp;&nbsp; Etsy</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="container-fluid"
                style={{ maxHeight: "100px" }}
                navbarScroll
                //className="ml-auto"
              >
                <Form className="d-flex ms-auto">
                  
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="form-control-lg rounded"
                    aria-label="Search"
                  />
                  <Button variant="outline-primary" size="sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    {/* Search */}
                  </Button>
                </Form>
                {LoginOutButton}
                {Favourite}
                <Nav.Link href="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-cart4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
  
// render(<Home />);
export default NavBar;