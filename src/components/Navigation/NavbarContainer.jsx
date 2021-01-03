import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOutAndWipeLocalStorage } from "../../interceptor";

function NavbarContainer(props) {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#14213d" }}>
      <Navbar.Brand style={{ color: "#ffffff" }}>BrzaKlopa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {props.user.role === "Admin" &&
          <Nav className="mr-auto">
            <Link className="pl-4 pr-4 text-white" to="/zaposlenici">
              Zaposlenici
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/meni">
              Meni
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/promet">
              Promet
            </Link>
          </Nav>
        }
        {props.user.role === "Konobar" &&
          <Nav className="mr-auto">
            <Link className="pl-4 pr-4 text-white" to="/">
              Narudžbe
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/meni">
              Meni
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/stolovi">
              Stolovi
            </Link>
          </Nav>
        }
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text style={{ color: "#ffffff" }}>
          Prijavljeni ste kao: {props.user.fname} {props.user.lname}
        </Navbar.Text>
        <Nav.Link onClick={logOutAndWipeLocalStorage}>Odjava</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarContainer;
