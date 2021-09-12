import {
  PURCHASE_SUCCEEDED,
  PURCHASE_FAILED,
  PURCHASE_STARTED,
  PURCHASE_INIT,
  FETCH_ORDERS_STARTED,
  FETCH_ORDERS_SUCCEEDED,
  FETCH_ORDERS_FAILED,
  REMOVE_ORDER,
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return {
    ...state,
    purchased: false,
  };
};
const purchaseStarted = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};
const purchaseSucceeded = (state, action) => {
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
};
const purchaseFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};
const fetchOrdersStarted = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};
const fetchOrdersSucceeded = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders,
  };
};
const fetchOrdersFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const removeOrder = (state, action) => {
  const id = action.id;
  const updatedArray = state.orders.filter((order) => order.id !== id);
  return {
    ...state,
    orders: updatedArray,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state, action);
    case PURCHASE_STARTED:
      return purchaseStarted(state, action);
    case PURCHASE_SUCCEEDED:
      return purchaseSucceeded(state, action);
    case PURCHASE_FAILED:
      return purchaseFailed(state, action);
    case FETCH_ORDERS_STARTED:
      return fetchOrdersStarted(state, action);
    case FETCH_ORDERS_SUCCEEDED:
      return fetchOrdersSucceeded(state, action);
    case FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    case REMOVE_ORDER:
      return removeOrder(state, action);
    default:
      return state;
  }
};

export default reducer;
