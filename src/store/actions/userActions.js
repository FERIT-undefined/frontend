import Axios from "axios";

export const registerUser = user => {
  return (dispatch, getState) => {
    Axios.post(`${process.env.REACT_APP_API_URL_USERS}register`, user)
      .then(res => dispatch({ type: "REGISTERED_USER", user: res.data.user }))
      .catch(err => {
        dispatch({ type: "REGISTRATION_ERROR", err });
      });
  };
};

export const loginUser = user => {
  return (dispatch, getState) => {
    Axios.post(`${process.env.REACT_APP_API_URL_USERS}login`, user)
      .then(res => dispatch({ type: "USER_LOGGED_IN", user: res.data.user }))
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};