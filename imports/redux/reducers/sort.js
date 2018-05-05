// import action types
import actionTypes from "../actions/types";
import defaultState from "../defaultState.json";

// destructure types
const { SET_SORT } = actionTypes;

// define reducer for sets
const sort = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SORT:
      return action.value;
    default:
      return state;
  }
};

// export reducer
export default sort;
