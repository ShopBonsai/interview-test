// import modules
import actionTypes from "./types";
import store from "../store";

// destructure getState from store
const { getState } = store;

const { ADD_TO_CART } = actionTypes;

// define class for creating default actions for base store state objects
export const addToCart = item => dispatch =>
  dispatch({
    type: ADD_TO_CART,
    item
  });
