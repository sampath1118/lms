import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import App from "../components/App";

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Main;
