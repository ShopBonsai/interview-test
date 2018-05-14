// import action types
import actionTypes from "../actions/types";
import defaultState from "../defaultState.json";

// destructure types
const { ADD_TO_CART, UPDATE_CART_ITEMS, RESET_CART } = actionTypes;

// define reducer for sets
const cart = (state = defaultState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.item] };
    case UPDATE_CART_ITEMS:
      return { ...state, items: action.cartItems };
    case RESET_CART:
      return { ...state, ...defaultState.cart };
    default:
      return state;
  }
};

// export reducer
export default cart;
