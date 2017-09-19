// Action Types
import {
  FETCH_LAST_ORDER,
  OPEN_RETURNS_DRAWER,
  UPDATE_RETURNS_QUANTITY,
  UPDATE_SELECTED_FOR_RETURN
} from "../constants/actionTypes.js";

const initialState = {
  orderDetails: [],
  returns: [],
  openDrawerFor: ""
};

const lastOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LAST_ORDER:
      return {
        ...state,
        orderDetails: action.payload
      };
    case OPEN_RETURNS_DRAWER:
      return {
        ...state,
        returns: [...state.returns, action.payload],
        openDrawerFor: action.payload.id
      };
    case UPDATE_RETURNS_QUANTITY:
      // Map over returns array, find the item that matches the action.payload.id
      // and updated its return quantity. Else, just return the item.
      const updatedReturnQuantityItems = state.returns.map(
        item =>
          item.id === action.payload.id
            ? { ...item, returnQuantity: action.payload.returnQuantity }
            : item
      );
      return {
        ...state,
        returns: updatedReturnQuantityItems
      };
    case UPDATE_SELECTED_FOR_RETURN:
      const updatedSelectedItems = state.returns.map(
        item =>
          item.id === action.payload
            ? { ...item, isSelected: !item.isSelected }
            : item
      );
      return {
        ...state,
        returns: updatedSelectedItems
      };
    default:
      return state;
  }
};

export default lastOrderReducer;
