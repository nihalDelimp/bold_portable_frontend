import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import RootRouter from "./RootRouter";

function App() {
  return (
    <React.Fragment>
      <RootRouter />
      <ToastContainer autoClose={6000} position="top-right" />
    </React.Fragment>
  );
}

export default App;
