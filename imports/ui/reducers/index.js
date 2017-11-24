import { combineReducers } from "redux";
import merchants from "./merchantsReducer";
import orders from "./ordersReducer";

export default combineReducers({
  merchants,
  orders
});
