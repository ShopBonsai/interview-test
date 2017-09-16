// Constants
import { FETCH_LAST_ORDER, OPEN_RETURNS_DRAWER } from "../constants/";

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
    default:
      return state;
  }
};

export default lastOrderReducer;
