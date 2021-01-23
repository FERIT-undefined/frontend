/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import { Nav, Navbar } from "startbootstrap-sb-admin-2/js/sb-admin-2";
import { Link } from "react-router-dom";
import { logOutAndWipeLocalStorage } from "../../interceptor";
import  RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AllOutIcon from "@material-ui/icons/AllOut";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import classNames from "classnames";

import NavItem from "./NavItem";
import "./NavbarContainer.scss";

function NavbarContainer(props) {
  const [activeIndex, setActiveIndex] = useState(window.location.pathname);

  useEffect(() => {
    if (window.location.pathname !== activeIndex) {
      setCurrentLocation(window.location.pathname);
    }
  });

  const setCurrentLocation = location => {
    setActiveIndex(location);
  };

  const onItemClick = e => {
    setActiveIndex(e.currentTarget.datasetlink);
  };

  const pages = [
    {
      isActive: window.location.pathname === "/",
      navItemIndex: "0",
      onItemClick,
      link: "/",
      text: "Narudžbe",
      imageSrc: <ListAltIcon className={classNames({
        "navbar-icon": true,
        selected: window.location.pathname === "/"
      })} />,
    },
    {
      isActive: window.location.pathname === "/meni",
      navItemIndex: "1",
      onItemClick,
      link: "/meni",
      text: "Menu",
      imageSrc: <MenuBookIcon className={classNames({
        "navbar-icon": true,
        selected: window.location.pathname === "/meni"
      })} />,
    },
    {
      isActive: window.location.pathname === "/stolovi",
      navItemIndex: "2",
      onItemClick,
      link: "/stolovi",
      text: "Stolovi",
      imageSrc: <AllOutIcon className={classNames({
        "navbar-icon": true,
        selected: window.location.pathname === "/stolovi"
      })} />,
    },
    {
      isActive: window.location.pathname === "/",
      navItemIndex: "3",
      onItemClick,
      link: "/",
      text: "Zaposlenici",
      imageSrc: <PeopleIcon className={classNames({
        "navbar-icon": true,
        selected: window.location.pathname === "/"
      })} />,
    },
    {
      isActive: window.location.pathname === "/meni",
      navItemIndex: "4",
      onItemClick,
      link: "/meni",
      text: "Menu",
      imageSrc: <MenuBookIcon className={classNames({
        "navbar-icon": true,
        selected: window.location.pathname === "/meni"
      })} />,
    },
    {
      isActive: window.location.pathname === "/promet",
      navItemIndex: "5",
      onItemClick,
      link: "/promet",
      text: "Promet",
      imageSrc: <ReceiptIcon className={classNames({
        "navbar-icon": true,
        selected: window.location.pathname === "/stolovi"
      })} />,
    }
  ].map(pagesProps => <NavItem key={pagesProps.navItemIndex} {...pagesProps} />);
  return (
    <nav className="sidebar col-12 col-md-3 col-lg-2">
      <div className="navbar__header">
        <RestaurantMenuIcon />
        BRZA KLOPA
      </div>
      <div className="navbar__body">
        {props.user.role === "Konobar" && pages.slice(0, 3)}
        {props.user.role === "Admin" && pages.slice(3,6)}
      </div>
    </nav>
    // <Navbar className="navbar-nav sidebar sidebar-dark accordion" expand="lg" style={{ backgroundColor: "#219ebc" }}>
    //   <Navbar.Brand style={{ color: "#ffffff" }}>Brza Klopa</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     {props.user.role === "Admin" &&
    //       <Nav className="mr-auto">
    //         <Link className="pl-4 pr-4 text-white" to="/" >
    //           <PeopleIcon style={{ marginRight:"10px" }} />
    //           Zaposlenici
    //         </Link>
    //         <Link className="pl-4 pr-4 text-white" to="/meni">
    //           <RestaurantMenuIcon style={{ marginRight:"10px" }}/>
    //           Menu
    //         </Link>
    //         <Link className="pl-4 pr-4 text-white" to="/promet">
    //           <ReceiptIcon style={{ marginRight:"10px" }}/>
    //           Promet
    //         </Link>
    //       </Nav>
    //     }
    //     {props.user.role === "Konobar" &&
    //       <Nav className="mr-auto">
    //         <Link className="pl-4 pr-4 text-white" to="/">
    //           <ListAltIcon style={{ marginRight:"10px" }}/>
    //           Narudžbe
    //         </Link>
    //         <Link className="pl-4 pr-4 text-white" to="/meni">
    //           <RestaurantMenuIcon style={{ marginRight:"10px" }}/>
    //           Menu
    //         </Link>
    //         <Link className="pl-4 pr-4 text-white" to="/stolovi">
    //           <AllOutIcon style={{ marginRight:"10px" }}/>
    //           Stolovi
    //         </Link>
    //       </Nav>
    //     }
    //   </Navbar.Collapse>
    //   <Navbar.Collapse className="justify-content-end">
    //     <Navbar.Text style={{ color: "#ffffff" }}>
    //       Prijavljeni ste kao: {props.user.fname} {props.user.lname}
    //     </Navbar.Text>
    //     <Nav.Link onClick={logOutAndWipeLocalStorage}><MeetingRoomIcon style={{color: "white"}}/></Nav.Link>
    //   </Navbar.Collapse>
    // </Navbar>
  );
}

export default NavbarContainer;
