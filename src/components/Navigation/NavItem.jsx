import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import "./NavItem.scss";

function NavItem(props) {
  return (
    <NavLink
      onClick={props.onItemClick}
      className={classNames({
        navbar__body__button: true,
        selected: props.isActive
      })}
      exact
      to={props.link}
      data-index={props.navItemIndex}
      data-link={props.link}
    >
      {props.imageSrc}
      <p className={classNames({
        navbar__body__button__text: true,
        selected: props.isActive,
      })}>
        {props.text}
      </p>
    </NavLink>
  );
}

export default NavItem;
