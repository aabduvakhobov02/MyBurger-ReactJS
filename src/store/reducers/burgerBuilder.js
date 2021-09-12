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

const addIngridients = (state, action) => {
  return {
    ...state,
    ingridients: {
      ...state.ingridients,
      [action.ingridientName]: state.ingridients[action.ingridientName] + 1,
    },
    totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
  };
};

const removeIngridients = (state, action) => {
  return {
    ...state,
    ingridients: {
      ...state.ingridients,
      [action.ingridientName]: state.ingridients[action.ingridientName] - 1,
    },
    totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName],
  };
};

const setIngridients = (state, action) => {
  return {
    ...state,
    ingridients: {
      bacon: action.ingridients.bacon,
      cheese: action.ingridients.cheese,
      meat: action.ingridients.meat,
      salad: action.ingridients.salad,
    },
    totalPrice: 4,
    error: false,
  };
};

const ingridientsError = (state, action) => {
  return {
    ...state,
    error: true,
  };
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case ADD_INGS:
      return addIngridients(state, action);
    case REMOVE_INGS:
      return removeIngridients(state, action);
    case SET_INGS:
      return setIngridients(state, action);
    case INGS_ERROR:
      return ingridientsError(state, action);
    default:
      return state;
  }
};

export default reducer;
