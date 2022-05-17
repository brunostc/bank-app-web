import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import store, { persistor } from "./app/store/store";
import axios from "axios";
import { setupAxios } from "./_metronic";
import App from "./App";
import "./index.scss";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/line-awesome/css/line-awesome.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";

const { PUBLIC_URL } = process.env;

// Interceptador do axios para verificar
// se possui token e configurar header.
setupAxios(axios, store);

ReactDOM.render(
  <App store={store} persistor={persistor} basename={PUBLIC_URL} />,
  document.getElementById("root")
);
