import { GET_ORDERS } from "./../actions/types";
import { combineReducers } from "redux";

const data = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS.SUCCESS:
      return action.orders;
    case GET_ORDERS.ERROR:
      return [];
    default:
      return state;
  }
};

const loading = (state = true, action) => {
  switch (action.type) {
    case GET_ORDERS.REQUEST:
      return true;
    case GET_ORDERS.SUCCESS:
    case GET_ORDERS.ERROR:
      return false;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case GET_ORDERS.ERROR:
      return action.error;
    case GET_ORDERS.REQUEST:
    case GET_ORDERS.SUCCESS:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  loading,
  error
});

export const stateSelector = state => {
  return state.orders;
};
