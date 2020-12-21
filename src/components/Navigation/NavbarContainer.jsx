import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOutAndWipeLocalStorage } from "../../interceptor";

function NavbarContainer(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>BrzaKlopa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {props.user.role === "Admin" &&
          <Nav className="mr-auto">
            <Link className="pl-4 pr-4" to="/zaposlenici">
              Zaposlenici
            </Link>
            <Link className="pl-4 pr-4" to="/meni">
              Meni
            </Link>
            <Link className="pl-4 pr-4" to="/promet">
              Promet
            </Link>
          </Nav>
        }
        {props.user.role === "User" &&
          <Nav className="mr-auto">
            <Link className="pl-4 pr-4" to="/">
              Narudžbe
            </Link>
            <Link className="pl-4 pr-4" to="/meni">
              Meni
            </Link>
            <Link className="pl-4 pr-4" to="/stolovi">
              Stolovi
            </Link>
          </Nav>
        }
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Prijavljeni ste kao: {props.user.fname} {props.user.lname}
        </Navbar.Text>
        <Nav.Link onClick={logOutAndWipeLocalStorage}>Odjava</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarContainer;
