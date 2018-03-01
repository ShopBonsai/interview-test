import { combineReducers } from "redux";
import merchants from "./merchants";

const rootReducer = combineReducers({
  merchantsReducer: merchants
});

export default rootReducer;
