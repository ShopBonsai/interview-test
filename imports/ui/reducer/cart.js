import { ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT } from "./../actions/types";
import { combineReducers } from "redux";

const products = (state = [], action) => {
  let products = [...state];
  switch (action.type) {
    case CHECKOUT.SUCCESS:
      return [];
    case ADD_TO_CART:
      let product = products.find(
        product => product.id == action.productInfo.id
      );
      if (product) {
        product.qty = product.qty + action.productInfo.qty;
        return products;
      }
      return [...state, action.productInfo];
    case REMOVE_FROM_CART:
      return products.filter(product => product.id != action.productInfo.id);
    default:
      return state;
  }
};

//Pre-Tax Total
const total = (state = 0, action) => {
  switch (action.type) {
    case CHECKOUT.SUCCESS:
      return 0;
    case ADD_TO_CART:
      return state + action.productInfo.price * action.productInfo.qty;
    case REMOVE_FROM_CART:
      return state - action.productInfo.price * action.productInfo.qty;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case CHECKOUT.REQUEST:
      return true;
    case CHECKOUT.SUCCESS:
    case CHECKOUT.ERROR:
      return false;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case CHECKOUT.ERROR:
      return action.error;
    case CHECKOUT.SUCCESS:
      return null;
    default:
      return state;
  }
};

export default combineReducers({ products, total, loading, error });

export const stateSelector = state => {
  return state.cart;
};
