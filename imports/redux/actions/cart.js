// import modules
import actionTypes from "./types";
import store from "../store";

// destructure getState from store
const { getState } = store;

const { ADD_TO_CART, UPDATE_CART_ITEMS, RESET_CART } = actionTypes;

// define class for creating default actions for base store state objects
export const addToCart = item => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  const cartItemIds = cartItems.map(item => item.id);
  // console.log(cartItemIds);
  if (cartItemIds.includes(item.id)) {
    return {
      res: "fail",
      message: "Item already in cart. Update quantity in cart instead."
    };
  }
  dispatch({
    type: ADD_TO_CART,
    item
  });
  return {
    res: "pass",
    message: `${item.quantity} items added to cart.`
  };
};

// define class for creating default actions for base store state objects
export const updateCartItem = item => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  let position = "";
  cartItems.forEach((cartItem, index) => {
    if (item.id === cartItem.id) {
      position = index;
    }
  });
  // console.log(item, cartItems, position);
  cartItems.splice(position, 1, item);
  // console.log(cartItems);
  return dispatch({
    type: UPDATE_CART_ITEMS,
    cartItems
  });
};

// define class for creating default actions for base store state objects
export const deleteItem = id => (dispatch, getState) => {
  // console.log(id);
  const cartItems = getState().cart.items.filter(item => item.id !== id);
  // console.log(cartItems);
  return dispatch({
    type: UPDATE_CART_ITEMS,
    cartItems
  });
};

// define class for creating default actions for base store state objects
export const resetCart = () => dispatch => {
  dispatch({
    type: RESET_CART
  });
};
