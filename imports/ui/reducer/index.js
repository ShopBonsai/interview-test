import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import merchants from "./merchants";
import products from "./products";
import cart from "./cart";

export default combineReducers({
  merchants,
  products,
  cart,
  routing
});
