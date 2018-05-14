// import moudules
import { combineReducers } from "redux";
import ui from "./ui";
import cart from "./cart";

// create coreReducer from slice reducers
const reducer = combineReducers({
  ui,
  cart
});

// export module
export default reducer;
