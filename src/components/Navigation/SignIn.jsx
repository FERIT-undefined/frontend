import React, { useEffect, useState } from "react";
import { loginUser } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

import "./SignIn.scss";

export default function SignIn(props) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();

  if (props.user) {
    window.location.assign("/");
  }

  useEffect(() => {
    setShowError(true);
  }, [error]);

  return (
    !props.user && 
      <div className="sign-in">
        <div className="box">
          <div className="logo-container">
            <div className="logo">
              <RestaurantMenuIcon
                style={{ color: "#003049", fontSize: "50px" }}
              />
              <div className="lead">BRZA KLOPA</div>
            </div>
          </div>

          <form
            className="form-container"
            onInput={() => setShowError(false)}
            onSubmit={e => {
              e.preventDefault();
              dispatch(loginUser(userDetails));
            }}
          >
            <input
              placeholder="E-mail"
              className="form-container__input"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <input
              placeholder="Lozinka"
              className="form-container__input"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
            <button
              className="form-container__btn"
              type="submit"
            >
              Sign In
            </button>
          </form>
          {showError && error && 
            <div className="error">Email ili lozinka nije ispravno unesena</div>
          }
        </div>
      </div>
  );
}
