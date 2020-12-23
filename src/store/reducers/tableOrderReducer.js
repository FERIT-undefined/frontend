import { useRouteMatch } from "react-router-dom";

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
    return { ...state, error: action.err };
  case "TABLE_ORDERS_CHANGE_STATUS":
    return { ...state,  tableOrders: [{...state.tableOrders[action.tableIndex], meals: [...state.tableOrders[action.tableIndex].meals.map((item, i ) => i === action.index ? {...item,status : action.status} : item)]}]};
  default:
    return state;
  }
};

export default tableOrder;
  