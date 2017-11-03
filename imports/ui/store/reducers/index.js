import { combineReducers } from "redux";
import { SET_USER, CLEAR_USER, SET_PRODUCTS } from "../actions/types";

function currentUser(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
}

function currentProducts(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser,
  currentProducts
});

export default rootReducer;
