import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./Contexts/Datacontext";
import { Provider } from 'react-redux'
import { store } from "./redux/store";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <DataProvider>
        <Provider store={store}>
          <App />
          </Provider>
        </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
