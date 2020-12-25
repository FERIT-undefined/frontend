import { combineReducers } from "redux";

import users from "./userReducer";
import menu from "./menuReducer";

const rootReducer = combineReducers({
  users,
  menu
});

export default rootReducer;
