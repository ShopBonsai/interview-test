import * as types from "../types";

const initialState = {
  loading: false,
  error: false,
  cart: [],
  cartCount: 0,
  success: false
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_CART: {
      let notUpdated = true;
      let updatedCart = state.cart.map(el => {
        if (el.productId === action.item.productId) {
          notUpdated = false;
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
      return {
        ...state,
        cart: [...action.cart],
        cartCount: isNaN(action.cartCount) ? 0 : action.cartCount
      };
    }
    case types.PROCESS_CHECKOUT_SUCCESS: {
      return {
        ...state,
        cart: [],
        cartCount: 0,
        success: true
      };
    }
    default:
      return state;
  }
}
