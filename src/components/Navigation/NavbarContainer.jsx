import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarContainer(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>BrzaKlopa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {props.user.role === "Admin" &&
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
        }
        {props.user.role === "User" &&
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Narudžbe</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/meni">Meni</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/stolovi">Stolovi</Link>
            </Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Prijavljeni ste kao:{" "}
          {props.user.fname} {props.user.lname}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarContainer;
