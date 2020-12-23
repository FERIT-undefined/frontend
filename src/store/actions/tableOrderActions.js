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
