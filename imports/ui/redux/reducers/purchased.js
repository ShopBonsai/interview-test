// GET Actions type
import { BUY_PRODUCT } from "../actions/purchase";

// Create default state for purchases
const defaultState = {
  list: []
};

// Purchase reducer

export default function purchasedReducer(
  state = defaultState,
  { type, payload }
) {
  /**
   * According to the action type make manipulation
   */
  switch (type) {
    /**
     * In this case we added purchase to existing purchases
     */
    case BUY_PRODUCT: {
      return { list: [...state.list, payload] };
    }
    default:
      return state;
  }
}
