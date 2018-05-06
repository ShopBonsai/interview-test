// import moudules
import { combineReducers } from "redux";
import ui from "./ui";

// create coreReducer from slice reducers
const reducer = combineReducers({
  ui
});

// export module
export default reducer;
