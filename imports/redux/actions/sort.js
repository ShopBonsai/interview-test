// import modules
import actionTypes from "./types";
import store from "../store";

// destructure getState from store
const { getState } = store;

const { SET_SORT } = actionTypes;

// define class for creating default actions for base store state objects
export const setSort = sort => dispatch =>
  dispatch({
    type: SET_SORT,
    value: sort
  });
