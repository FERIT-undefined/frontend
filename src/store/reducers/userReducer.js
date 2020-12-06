const initState = {
  user: null,
  users: [],
  error: "",
};
const users = (state = initState, action) => {
  switch (action.type) {
  case "REGISTERED_USER":
  case "USER_LOGGED_IN":
    return { user: action.user };
  case "REGISTRATION_ERROR":
  case "LOGIN_ERROR":
    return { error: action.err };
  default:
    return state;
  }
};
export default users;