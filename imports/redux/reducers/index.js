// import moudules
import { combineReducers } from "redux";
import filter from "./filter";
import sort from "./sort";

// create coreReducer from slice reducers
const reducer = combineReducers({
  filter,
  sort
});

// export module
export default reducer;
