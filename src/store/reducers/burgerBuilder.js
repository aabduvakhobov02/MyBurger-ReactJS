import {
  ADD_INGS,
  REMOVE_INGS,
  SET_INGS,
  INGS_ERROR,
} from "../actions/actionTypes";

const initialStore = {
  ingridients: null,
  totalPrice: 4,
  error: false,
};

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1,
  bacon: 0.7,
};

const burgerBuilderReducer = (state = initialStore, action) => {
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
    case SET_INGS:
      return {
        ...state,
        ingridients: {
          bacon: action.ingridients.bacon,
          cheese: action.ingridients.cheese,
          meat: action.ingridients.meat,
          salad: action.ingridients.salad,
        },
        error: false,
      };
    case INGS_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default burgerBuilderReducer;
