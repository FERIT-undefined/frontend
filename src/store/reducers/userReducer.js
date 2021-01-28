const initState = {
  user: null,
  users: [],
  error: "",
};
const users = (state = initState, action) => {
  switch (action.type) {
  case "USER_LOGGED_IN":
    return { ...state, user: action.user };
  case "USER_REMOVED_ERROR":
  case "USER_PATCHED_ERROR":
  case "REGISTRATION_ERROR":
  case "LOGIN_ERROR":
  case "USERS_RETRIEVED_ERROR":
    return { ...state, error: action.err };
  case "USERS_RETRIEVED":
    return { ...state, users: action.users };
  case "USER_REMOVED":
  case "USER_PATCHED":
    return { ...state };
  default:
    return state;
  }
};
export default users;
