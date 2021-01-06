import Axios from "axios";

export const getAllMeals = () => {
  return (dispatch, getState) => {
    Axios.get(`${process.env.REACT_APP_API_URL_MENU}`)
      .then(res =>
        dispatch({
          type: "RETRIEVED_ALL_MEALS_LIST",
          allMeals: res.data.allMeals,
        })
      )
      .catch(err => {
        dispatch({ type: "RETRIEVED_ALL_MEALS_LIST_ERROR", err });
      });
  };
};

export const addNewMeal = (user, meal) => {
  return (dispatch, getState) => {
    Axios.post(`${process.env.REACT_APP_API_URL_MENU}add`, {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      ...meal,
    })
      .then(res => {
        dispatch(getAllMeals());
      })
      .catch(err => {
        dispatch({ type: "ADDED_NEW_MEAL_ERROR", err });
      });
  };
};

export const removeMeal = (user, mealId) => {
  return (dispatch, getState) => {
    Axios.delete(`${process.env.REACT_APP_API_URL_MENU}remove/${mealId}`, {
      data: {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
    })
      .then(res => {
        dispatch(getAllMeals());
      })
      .catch(err => {
        dispatch({ type: "MEAL_REMOVED_ERROR", err });
      });
  };
};

export const updateMeal = (user, mealToEdit) => {
  return (dispatch, getState) => {
    Axios.patch(`${process.env.REACT_APP_API_URL_MENU}${mealToEdit.id}`, {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      name: mealToEdit.name,
      description: mealToEdit.description,
      price: mealToEdit.price,
      type: mealToEdit.type,
      pdv: mealToEdit.pdv,
      discount: mealToEdit.discount,
    })
      .then(res => {
        dispatch(getAllMeals());
      })
      .catch(err => {
        dispatch({ type: "MEAL_PATCHED_ERROR", err });
      });
  };
};
