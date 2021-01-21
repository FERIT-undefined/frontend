import Axios from "axios";

export const getTableOrders = () => {
  return (dispatch, getState) => {
    Axios.get(`${process.env.REACT_APP_API_URL_ORDER}`)
      .then(res =>
        dispatch({
          type: "TABLE_ORDERS_RETRIEVED",
          tableOrders: res.data.allOrders,
        })
      )
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_RETRIEVED_ERROR", err });
      });
  };
};

export const changeStatus = (status, table, meal, user) => {
  console.log(meal.id);
  return (dispatch, getState) => {
    Axios.patch(
      `${process.env.REACT_APP_API_URL_ORDER}${table.table}/${meal.id}`,
      {
        refreshToken: user.refreshToken,
        status: status,
        accessToken: user.accessToken,
      }
    )
      .then(res => {
        console.log(res);
        dispatch({
          type: "TABLE_ORDERS_CHANGE_STATUS",
          // index: index,
          status: status,
          // tableIndex: tableIndex,
        });
      }
      )
      .then(res => dispatch(getTableOrders()))
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_CHANGE_STATUS_ERROR", err });
      });
  };
};

export const addOrder = (user, table, meals, totalPrice) => {
  console.log(meals);
  return (dispatch, getState) => {
    Axios.post(`${process.env.REACT_APP_API_URL_ORDER}add`, {
      table,
      meals,
      total_price: totalPrice,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    })
      .then(res => dispatch(getTableOrders()))
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_ADD_ORDER_ERROR" });
      });
  };
};

export const exportOrder = (table, user) => {
  return (dispatch, getState) => {
    Axios.patch(`${process.env.REACT_APP_API_URL_ORDER}export`, {
      table: table,
    })
      .then(res => {
        dispatch(getTableOrders());
      })
      .catch(err => {
        dispatch({ type: "TABLE_ORDERS_ADD_ORDER_ERROR" });
      });
  };
};
