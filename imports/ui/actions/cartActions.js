import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QTY } from "./types";

export const addToCart = productInfo => {
  return {
    type: ADD_TO_CART,
    productInfo
  };
};

export const removeFromCart = productInfo => {
  return {
    type: REMOVE_FROM_CART,
    productInfo
  };
};
