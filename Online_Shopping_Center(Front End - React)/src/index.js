import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Products from "./components/product";
import Factories from "./components/factory";
import AddProduct from "./components/product_adding";
import AddFactory from "./components/factory_adding";
import Users from "./components/user";
import Home from "./components/home";
import Login from "./components/logIn";
import Welcome from "./components/welcome";
import FinalBuy from "./components/finalBuy";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import ProductOnCard from "./components/oncardproducts";

ReactDOM.render(<Home />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
