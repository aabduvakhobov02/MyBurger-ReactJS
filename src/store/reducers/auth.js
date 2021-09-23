import {
  AUTH_STARTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStarted = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSucceeded = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const authFailed = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_STARTED:
      return authStarted(state, action);
    case AUTH_SUCCEEDED:
      return authSucceeded(state, action);
    case AUTH_FAILED:
      return authFailed(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
