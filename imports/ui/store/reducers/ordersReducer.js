import * as types from "../types";

const initialState = {
  loading: false,
  error: false,
  cart: [],
  cartCount: 0
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_CART: {
      let notUpdated = true;
      const updatedCart = state.cart.map(el => {
        if (el.productId === action.item.productId) {
          notUpdated = false;
          const merge = { quantity: el.quantity + 1 };
          return { ...el, quantity: el.quantity + 1 };
        } else {
          return { ...el };
        }
      });
      notUpdated && updatedCart.push({ ...action.item });
      return {
        ...state,
        cart: updatedCart,
        cartCount: state.cartCount + 1
      };
    }
    case types.LOAD_CART: {
      return { ...state, cart: [...action.cart] };
    }
    default:
      return state;
  }
}
