// import action types
import actionTypes from "../actions/types";
import defaultState from "../defaultState.json";

// destructure types
const {
  SET_FILTER,
  UNSET_FILTER,
} = actionTypes;

// define reducer for sets
const filter = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    case UNSET_FILTER:
      return defaultState;
    default:
      return state;
  }
};

// export reducer
export default filter;
