import React, { useState } from "react";
import { logOutAndWipeLocalStorage } from "../../interceptor";

import "./Header.scss";

function Header(props) {
  return (
    <div className="header">
      <div className="header__left">
        {props.label}
      </div>
      <div className="header__right">
        <div className="header__right__user">
          {`${props.user.fname} ${props.user.lname}`}
        </div>
        <button
          className="header__right__logout"
          onClick={logOutAndWipeLocalStorage}
        >Odjava</button>
      </div>
    </div>
  );
}

export default Header;
