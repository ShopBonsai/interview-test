import * as types from "../types";

const initialState = {
  loading: false,
  error: false,
  cart: []
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_CART: {
      const newCart = [...state.cart, { ...action.item }];
      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
}
