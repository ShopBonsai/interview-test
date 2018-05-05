// import moudules
import { combineReducers } from "redux";
import filter from "./filter";

// create coreReducer from slice reducers
const reducer = combineReducers({
  filter
});

// export module
export default reducer;
