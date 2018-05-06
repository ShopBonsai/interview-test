// import action types
import actionTypes from "../actions/types";
import defaultState from "../defaultState.json";

// destructure types
const {
  SET_FILTER,
  UNSET_FILTER,
  SET_SORT,
  SET_PRODUCT_SHOW,
  UNSET_PRODUCT_SHOW
} = actionTypes;

// define reducer for sets
const filter = (state = defaultState.ui, action) => {
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
    default:
      return state;
  }
};

// export reducer
export default filter;
