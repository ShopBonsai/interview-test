// import action types
import actionTypes from "../actions/types";
import defaultState from "../defaultState.json";

// destructure types
const { SET_FILTER, UNSET_FILTER, SET_SORT } = actionTypes;

// define reducer for sets
const filter = (state = defaultState.ui, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case UNSET_FILTER:
      return { ...state, filter: defaultState.ui.filter };
    case SET_SORT:
      return { ...state, currentSort: action.value };
    default:
      return state;
  }
};

// export reducer
export default filter;
