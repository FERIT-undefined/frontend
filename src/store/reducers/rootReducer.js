import { combineReducers } from "redux";

import users from "./userReducer";
import menu from "./menuReducer";
import tableOrder from "./tableOrderReducer";
import traffic from "./trafficReducer";

const rootReducer = combineReducers({
  users,
  menu,
  traffic,
  tableOrder,
});

export default rootReducer;
