import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles.scss";
import Router from "./routes/routes";

import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./hooks/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
