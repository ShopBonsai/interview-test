// import modules
import actionTypes from "./types";
import store from "../store";

// destructure getState from store
const { getState } = store;

const {
  SET_FILTER,
  UNSET_FILTER,
  SET_SORT,
  SET_PRODUCT_SHOW,
  UNSET_PRODUCT_SHOW,
  SET_FILTERED,
  RESET_UI,
  SHOW_MODAL,
  CLOSE_MODAL
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
// define class for creating default actions for base store state objects
export const setSort = sort => dispatch =>
  dispatch({
    type: SET_SORT,
    value: sort
  });
// define function for setting a single product to display
export const setProductShow = id => dispatch =>
  dispatch({
    type: SET_PRODUCT_SHOW,
    id
  });
// define function for setting a single product to display
export const unsetProductShow = () => dispatch =>
  dispatch({
    type: UNSET_PRODUCT_SHOW
  });
// define function for setting a single product to display
export const setFiltered = filtered => dispatch =>
  dispatch({
    type: SET_FILTERED,
    filtered
  });
// define function for setting a single product to display
export const resetUi = () => dispatch =>
  dispatch({
    type: RESET_UI
  });

// open modal with kind and message
export const showModal = (kind, message) => dispatch =>
  dispatch({
    type: SHOW_MODAL,
    status: true,
    kind,
    message
  });

// open modal with kind and message
export const closeModal = () => dispatch =>
  dispatch({
    type: CLOSE_MODAL
  });
