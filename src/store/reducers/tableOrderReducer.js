import { useRouteMatch } from "react-router-dom";
import update from "immutability-helper";

const initState = {
  status: null,
  tableOrders: [],
  error: "",
};

const tableOrder = (state = initState, action) => {
  switch (action.type) {
  case "TABLE_ORDERS_RETRIEVED_ERROR":
    return { ...state, error: action.err };
  case "TABLE_ORDERS_RETRIEVED":
    return { ...state, tableOrders: action.tableOrders };
  case "TABLE_ORDERS_CHANGE_STATUS_ERROR":
  case "TABLE_ORDER_ADD_ERROR":
    return { ...state, error: action.err };
  case "TABLE_ORDERS_CHANGE_STATUS":
    return update(state, {tableOrders: { [action.tableIndex]: {meals: {[action.index]: {status: {$set: action.status}}}}}});
  default:
    return state;
  }
};

export default tableOrder;
