import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import counter from "./state/counter";

import * as serviceWorker from "./serviceWorker";

const reducers = combineReducers({
  counter
});

const logger = store => next => action => {
  console.groupCollapsed(action.type);
  console.log("prev state: ", store.getState());
  console.log("action: ", action);
  const result = next(action);
  console.log("next state: ", store.getState());
  console.groupEnd();
  return result;
};

const middleware = applyMiddleware(logger);

const store = createStore(
  reducers,
  /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
