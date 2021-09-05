import { ADD_INGS, REMOVE_INGS } from "./actions";

const initialStore = {
  ingridients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 4,
};

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1,
  bacon: 0.7,
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case ADD_INGS:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] + 1,
        },
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
      };
    case REMOVE_INGS:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] - 1,
        },
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName],
      };
    default:
      return state;
  }
};

export default reducer;
