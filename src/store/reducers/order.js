import {
  PURCHASE_SUCCEEDED,
  PURCHASE_FAILED,
  PURCHASE_STARTED,
  PURCHASE_INIT,
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case PURCHASE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_SUCCEEDED:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case PURCHASE_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
