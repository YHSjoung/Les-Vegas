"use client";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Navbar, Product, Footer } from ".";

const wrapperNav = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </>
  );
};

export default wrapperNav;
