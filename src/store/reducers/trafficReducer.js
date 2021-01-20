const initState = {
  traffic: [],
  error: "",
};
const traffic = (state = initState, action) => {
  switch (action.type) {
  case "RETRIEVED_TRAFFIC":
    return { ...state, traffic: action.traffic };
  case "RETRIEVED_TRAFFIC_ERROR":
    return { ...state, traffic: [], error: action.err };
  default:
    return state;
  }
};
export default traffic;
