import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarContainer(props) {
  console.log(props.user);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {props.user.role === "Admin" &&
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Zaposlenici</Link>
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
