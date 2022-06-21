import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers/reducers";
import { BrowserRouter } from "react-router-dom";
import {currentUser} from "./business/CurrentUser";

const composeEnhancers =
  typeof window !== "undefined"
    ? // React DevTools
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
currentUser.restore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
