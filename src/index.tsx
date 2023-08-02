import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from 'redux-persist/integration/react';
import store from "./Redux/store";
import { persistor } from "./Redux/store";
// import './asstes/css/main.css';
import './asstes/scss/main.scss';
import 'react-datepicker/dist/react-datepicker.css';




import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
);
