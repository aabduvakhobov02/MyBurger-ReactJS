import {
  AUTH_STARTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
} from "./actionTypes";
import axios from "axios";

export const authStarted = () => {
  return {
    type: AUTH_STARTED,
  };
};

export const authSucceeded = (token, userId) => {
  return {
    type: AUTH_SUCCEEDED,
    idToken: token,
    userId: userId,
  };
};
export const authFailed = (error) => {
  return {
    type: AUTH_FAILED,
    error: error,
  };
};

export const checkAuthLogout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStarted());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbaR5pI5NoS84XlI8Jb9L1VOAQ6x6SX3g";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbaR5pI5NoS84XlI8Jb9L1VOAQ6x6SX3g";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSucceeded(response.data.idToken, response.data.localId));
        dispatch(checkAuthLogout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFailed(error.response.data.error));
      });
  };
};
