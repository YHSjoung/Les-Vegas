"use client";
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Navbar, Main, Product, Footer } from ".";

const wrapper = () => {


    return(
        <>
    <Provider store={store}>
    <Product />
    </Provider>
        </>
    )
};

export default wrapper; 