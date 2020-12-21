const initState = {
  user: null,
  users: [],
  error: "",
};
const users = (state = initState, action) => {
  switch (action.type) {
  case "REGISTERED_USER":
  case "USER_LOGGED_IN":
    return { ...state, user: action.user };
  case "REGISTRATION_ERROR":
  case "LOGIN_ERROR":
  case "USERS_RETRIEVED_ERROR":
    return { ...state, error: action.err };
  case "USERS_RETRIEVED":
    return { ...state, users: action.users };
  default:
    return state;
  }
};
export default users;