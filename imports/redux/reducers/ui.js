// import action types
import actionTypes from "../actions/types";
import defaultState from "../defaultState.json";

// destructure types
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

// define reducer for sets
const ui = (state = defaultState.ui, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case UNSET_FILTER:
      return { ...state, filter: defaultState.ui.filter };
    case SET_SORT:
      return { ...state, currentSort: action.value };
    case SET_PRODUCT_SHOW:
      return { ...state, productShow: action.id };
    case UNSET_PRODUCT_SHOW:
      return { ...state, productShow: defaultState.ui.productShow };
    case SET_FILTERED:
      return { ...state, filterResults: action.filtered };
    case RESET_UI:
      return { ...state, ...defaultState.ui };
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          status: action.status,
          kind: action.kind,
          message: action.message
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          status: defaultState.ui.modal.status,
          kind: defaultState.ui.modal.kind,
          message: defaultState.ui.modal.message
        }
      };
    default:
      return state;
  }
};

// export reducer
export default ui;
