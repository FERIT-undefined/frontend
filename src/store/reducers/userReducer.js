const initState = {
  user: null,
  users: [],
};
const users = (state = initState, action) => {
  switch (action.type) {
  case "REGISTERED_USER":
  case "USER_LOGGED_IN":
    return { user: action.user };
  default:
    return state;
  }
};
export default users;