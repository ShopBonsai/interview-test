// Constants
import {
  FETCH_LAST_ORDER,
  OPEN_RETURNS_DRAWER,
  UPDATE_RETURNS_QUANTITY
} from "../constants/";

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
      const updatedItems = state.returns.map(
        item =>
          item.id === action.payload.id
            ? { ...item, returnQuantity: action.payload.returnQuantity }
            : item
      );
      return {
        ...state,
        returns: updatedItems
      };
    default:
      return state;
  }
};

export default lastOrderReducer;
