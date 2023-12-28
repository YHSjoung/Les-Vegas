import React from "react";
import { Footer, Navbar } from "../component";
import { useSelector, useDispatch, Provider } from "react-redux";
import { addCart, delCart } from "../redux/action";
import Link from "next/link";
import EmptyCart from "./cart_client";
import ShowCart from "./ShowCart";
import store from "../redux/store";


export default function Cart({ userId }: { userId: string }) {
  // const state = useSelector((state: any) => state.handleCart);

  return (
    <>
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {/* {state.length > 0 ? <ShowCart /> : <EmptyCart />} */}
        <Provider store={store}><ShowCart /></Provider>
      </div>
      <Footer />
    </>
  );
};
