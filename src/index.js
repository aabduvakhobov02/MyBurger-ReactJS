import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
