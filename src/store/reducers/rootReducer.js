import { combineReducers } from "redux";

import users from "./userReducer";
import menu from "./menuReducer";
import tableOrder from "./tableOrderReducer";

const rootReducer = combineReducers({
  users,
  menu,
  tableOrder,
});

export default rootReducer;
