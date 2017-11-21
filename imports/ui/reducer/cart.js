import { ADD_TO_CART, REMOVE_FROM_CART } from "./../actions/types";
import { combineReducers } from "redux";

const products = (state = [], action) => {
  let products = [...state];
  switch (action.type) {
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
    case ADD_TO_CART:
      return state + action.productInfo.price * action.productInfo.qty;
    case REMOVE_FROM_CART:
      return state - action.productInfo.price * action.productInfo.qty;
    default:
      return state;
  }
};

export default combineReducers({ products, total });

export const stateSelector = state => {
  return state.cart;
};
