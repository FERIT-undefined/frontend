/* eslint-disable react/prop-types */
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOutAndWipeLocalStorage } from "../../interceptor";
import ReceiptIcon from "@material-ui/icons/Receipt";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AllOutIcon from "@material-ui/icons/AllOut";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

function NavbarContainer(props) {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#219ebc" }}>
      <Navbar.Brand style={{ color: "#ffffff" }}>Brza Klopa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {props.user.role === "Admin" &&
          <Nav className="mr-auto">
            <Link className="pl-4 pr-4 text-white" to="/zaposlenici" >
              <PeopleIcon style={{ marginRight:"10px" }} />
              Zaposlenici
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/meni">
              <RestaurantMenuIcon style={{ marginRight:"10px" }}/>
              Menu
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/promet">
              <ReceiptIcon style={{ marginRight:"10px" }}/>
              Promet
            </Link>
          </Nav>
        }
        {props.user.role === "User" &&
          <Nav className="mr-auto">
            <Link className="pl-4 pr-4 text-white" to="/">
              <ListAltIcon style={{ marginRight:"10px" }}/>
              Narudžbe
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/meni">
              <RestaurantMenuIcon style={{ marginRight:"10px" }}/>
              Menu
            </Link>
            <Link className="pl-4 pr-4 text-white" to="/stolovi">
              <AllOutIcon style={{ marginRight:"10px" }}/>
              Stolovi
            </Link>
          </Nav>
        }
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text style={{ color: "#ffffff" }}>
          Prijavljeni ste kao: {props.user.fname} {props.user.lname}
        </Navbar.Text>
        <Nav.Link onClick={logOutAndWipeLocalStorage}><MeetingRoomIcon style={{color: "white"}}/></Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarContainer;
