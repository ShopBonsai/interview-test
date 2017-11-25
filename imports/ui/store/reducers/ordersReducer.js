import * as types from "../types";

const initialState = {
  loading: false,
  error: false,
  cart: []
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_CART: {
      const { productId, quantity, totalPrice } = action;
      const newCart = [
        ...state.cart,
        {
          productId,
          quantity,
          totalPrice
        }
      ];
      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
}
