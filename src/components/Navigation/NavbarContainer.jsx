import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarContainer(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/zaposlenici">Zaposlenici</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/meni">Meni</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/promet">Promet</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:{" "}
          <a href="#login">
            {props.user.fname} {props.user.lname}
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarContainer;
