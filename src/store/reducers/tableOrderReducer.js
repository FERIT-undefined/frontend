const initState = {
  tableOrders: [],
  error: "",
};

const tableOrder = (state = initState, action) => {
  switch (action.type) {
  case "TABLE_ORDERS_RETRIEVED_ERROR":
    return { ...state, error: action.err };
  case "TABLE_ORDERS_RETRIEVED":
    return { ...state, tableOrders: action.tableOrders };
  default:
    return state;
  }
};

export default tableOrder;
  