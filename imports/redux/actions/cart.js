// import modules
import actionTypes from "./types";
import store from "../store";

// destructure getState from store
const { getState } = store;

const { ADD_TO_CART, UPDATE_CART_ITEMS } = actionTypes;

// define class for creating default actions for base store state objects
export const addToCart = item => dispatch =>
  dispatch({
    type: ADD_TO_CART,
    item
  });

// define class for creating default actions for base store state objects
export const updateCartItem = item => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  let position = "";
  cartItems.forEach((cartItem, index) => {
    if (item.product === cartItem.product) {
      position = index;
    }
  });
  // console.log(item, cartItems, position);
  cartItems.splice(position, 1, item);
  // console.log(cartItems);
  dispatch({
    type: UPDATE_CART_ITEMS,
    cartItems
  });
};
