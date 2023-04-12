import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CountProvider from "./CountContext/CountContext";
import GlobalProvider from "./GlobalContext/GlobalContext";
import myCounter from "./Mobx/Counter";
import { Provider } from "react-redux";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CountProvider>
    <GlobalProvider>
      <App counter={myCounter} />
    </GlobalProvider>
    </CountProvider>
  </Provider>
);