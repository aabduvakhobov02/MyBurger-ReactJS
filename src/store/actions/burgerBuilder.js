import { ADD_INGS, REMOVE_INGS, SET_INGS, INGS_ERROR } from "./actionTypes";
import axios from "../../axios-orders";

export const addIngridients = (name) => {
  return {
    type: ADD_INGS,
    ingridientName: name,
  };
};

export const removeIngridients = (name) => {
  return {
    type: REMOVE_INGS,
    ingridientName: name,
  };
};

export const setIngridients = (ingridients) => {
  return {
    type: SET_INGS,
    ingridients: ingridients,
  };
};

export const ingridientsError = () => {
  return {
    type: INGS_ERROR,
  };
};

export const fetchIngridients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://gurman-myburger-default-rtdb.asia-southeast1.firebasedatabase.app/ingridients.json"
      )
      .then((response) => {
        dispatch(setIngridients(response.data));
      })
      .catch((error) => {
        dispatch(ingridientsError());
      });
  };
};
