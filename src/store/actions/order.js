import {
  PURCHASE_SUCCEEDED,
  PURCHASE_FAILED,
  PURCHASE_STARTED,
  PURCHASE_INIT,
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

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseStarted());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseSucceeded(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseFailed(error));
      });
  };
};
