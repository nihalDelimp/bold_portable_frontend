import React from "react";
import { ToastContainer } from "react-toastify";
import RootRouter from "./RootRouter";

console.log("Fixed product images swiper 2")

function App() {
  return (
    <>
      <RootRouter />
      <ToastContainer autoClose={6000} position="top-right" />
    </>
  );
}

export default App;
