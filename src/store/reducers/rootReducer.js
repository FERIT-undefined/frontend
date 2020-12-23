import { combineReducers } from "redux";

import users from "./userReducer";
import tableOrder from "./tableOrderReducer";

const rootReducer = combineReducers({
  users,
  tableOrder,
});

export default rootReducer;
