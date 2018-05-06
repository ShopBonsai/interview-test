// import modules
import actionTypes from "./types";
import store from "../store";

// destructure getState from store
const { getState } = store;

const { SET_FILTER, UNSET_FILTER, SET_SORT } = actionTypes;

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
// define class for creating default actions for base store state objects
export const setSort = sort => dispatch =>
  dispatch({
    type: SET_SORT,
    value: sort
  });
