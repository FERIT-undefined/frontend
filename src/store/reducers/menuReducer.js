const initState = {
  allMeals: [],
  error: "",
};
const menu = (state = initState, action) => {
  switch (action.type) {
  case "RETRIEVED_ALL_MEALS_LIST":
  case "ADDED_NEW_MEAL":
    return { ...state, allMeals: action.allMeals };
  case "RETRIEVED_ALL_MEALS_LIST_ERROR":
    return { ...state, allMeals: [] };
  case "ADDED_NEW_MEAL_ERROR":
  case "MEAL_REMOVED_ERROR":
  case "MEAL_PATCHED_ERROR":
    return { ...state, error: action.err };
  default:
    return state;
  }
};
export default menu;
