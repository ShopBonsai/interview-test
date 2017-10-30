import types from "../actions/types";
// Helpers
import { roundExactly } from "../helpers/num-helper";

const INITIAL_STATE = {
  items: {}, // stored in the format { id: quantity }
  totalPrice: 0
};

let quantity;
let price;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      // add 1 to quantity
      quantity = 1;
      if (state.items.hasOwnProperty(action.product.id)) {
        quantity = state.items[action.product.id] + 1;
      }
      // add price to total
      price = parseFloat(
        roundExactly(state.totalPrice + action.product.price, 2)
      );

      return {
        ...state,
        items: { ...state.items, [action.product.id]: quantity },
        totalPrice: price
      };
    case types.REMOVE_FROM_CART:
      // make sure that item exists in cart
      if (!state.items.hasOwnProperty(action.product.id)) {
        return state;
      }
      // make sure that item quantity is more than 0
      if (state.items[action.product.id] < 1) {
        return state;
      }

      // subtract 1 from quantity
      quantity = state.items[action.product.id] - 1;
      // make a copy of the current state's items and remove the item from it if quantity is 0
      const newItems = { ...state.items, [action.product.id]: quantity };
      if (quantity === 0) {
        delete newItems[action.product.id];
      }
      // subtract price from total
      price = parseFloat(
        roundExactly(state.totalPrice - action.product.price, 2)
      );

      return {
        ...state,
        items: newItems,
        totalPrice: price
      };
    case types.CLEAR_CART:
      return INITIAL_STATE;
  }

  return state;
}
