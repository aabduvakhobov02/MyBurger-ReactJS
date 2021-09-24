import {
  PURCHASE_SUCCEEDED,
  PURCHASE_FAILED,
  PURCHASE_STARTED,
  PURCHASE_INIT,
  FETCH_ORDERS_STARTED,
  FETCH_ORDERS_SUCCEEDED,
  FETCH_ORDERS_FAILED,
  REMOVE_ORDER,
} from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseSucceeded = (id, orderData) => {
  return {
    type: PURCHASE_SUCCEEDED,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseFailed = (error) => {
  return {
    type: PURCHASE_FAILED,
    error: error,
  };
};

export const purchaseStarted = () => {
  return {
    type: PURCHASE_STARTED,
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseStarted());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseSucceeded(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseFailed(error));
      });
  };
};

export const fetchOrdersStarted = () => {
  return {
    type: FETCH_ORDERS_STARTED,
  };
};

export const fetchOrdersSucceeded = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCEEDED,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStarted());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSucceeded(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};

export const removeOrder = (id) => {
  return {
    type: REMOVE_ORDER,
    id: id,
  };
};

export const deleteOrder = (id, token) => {
  return (dispatch) => {
    const queryParams =
      "?auth=" + token;
    axios.delete(`/orders/${id}.json` + queryParams);
    dispatch(removeOrder(id));
  };
};
