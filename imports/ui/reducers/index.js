import { combineReducers } from "redux";
import cart from "./cart";
import Alert from "./alert";

const rootReducer = combineReducers({
  Alert,
  cart
});

export default rootReducer;
