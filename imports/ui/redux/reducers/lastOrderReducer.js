import { FETCH_LAST_ORDER } from "../constants/";

const initialState = [];

const lastOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LAST_ORDER:
      return action.payload;
    default:
      return state;
  }
};

export default lastOrderReducer;
