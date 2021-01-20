import Axios from "axios";

export const getTraffic = (startDate, endDate) => {
  return (dispatch, getState) => {
    Axios.get(`${process.env.REACT_APP_API_URL_TRAFFIC}${startDate}/${endDate}`)
      .then(res =>
        dispatch({
          type: "RETRIEVED_TRAFFIC",
          traffic: res.data.traffic,
        })
      )
      .catch(err => {
        dispatch({ type: "RETRIEVED_TRAFFIC_ERROR", err });
      });
  };
};
