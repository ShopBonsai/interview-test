// import modules
import store from "../store";
import actionTypes from "./types";

// destructure getState from store
const { getState } = store;

const {
  SET_FILTER,
  UNSET_FILTER
} = actionTypes;

// define class for creating default actions for base store state objects
export const setFilter = filter => dispatch =>
  dispatch({
    type: SET_FILTER,
    filter
  });
// define class for creating default actions for base store state objects
export const unsetFilter = () => dispatch =>
  dispatch({
    type: UNSET_FILTER
  });
