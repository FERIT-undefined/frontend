import Axios from "axios";


export const getTableOrders = () => {
  return (dispatch, getState) => {
    Axios.get(`${process.env.REACT_APP_API_URL_ORDER}`)
      .then(res => dispatch({ type: "TABLE_ORDERS_RETRIEVED", tableOrders: res.data.allOrders }))
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_RETRIEVED_ERROR", err });
      });
  };
};

export const changeStatus = (status, table, index, user, tableIndex) => {
  return (dispatch, getState) => {
    Axios.patch(`${process.env.REACT_APP_API_URL_ORDER}${table.table}/${index}`,
      {
        refreshToken: user.refreshToken,
        status: status,
        accessToken: user.accessToken
      })
      .then(res => dispatch({ type: "TABLE_ORDERS_CHANGE_STATUS", index: index, status: status, tableIndex: tableIndex }))
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_CHANGE_STATUS_ERROR", err });
      });
  };
};

export const addOrder = (user, order) => {
  return (dispatch, getState) => {
    Axios.post(`${process.env.REACT_APP_API_URL_ORDER}add`, {
      ...order,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    })
      .then(res => dispatch({ type: "TABLE_ORDERS_ADD_ORDER", tableOrder: res }))
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_ADD_ORDER_ERROR" });
      });
  };
};

