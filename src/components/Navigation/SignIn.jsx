import React, { useEffect, useState } from "react";
import { loginUser } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

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
        <div className="sign-in__form-container">
          <div className="sign-in__form-container__label">
            Dobrodošli natrag!
          </div>
          <form
            className="sign-in__form-container__form"
            onInput={() => setShowError(false)}
            onSubmit={e => {
              e.preventDefault();
              dispatch(loginUser(userDetails));
            }}
          >
            <input
              placeholder="E-mail"
              className="sign-in__form-container__form__email"
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
              className="sign-in__form-container__form__password"
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
              className="sign-in__form-container__form__btn"
              type="submit"
            >
              Sign In
            </button>
          </form>
          {showError && error && 
            <div className="sign-in__form-container__error">Email ili lozinka nije ispravno unesena</div>
          }
        </div>
      </div>
    
  );
}
