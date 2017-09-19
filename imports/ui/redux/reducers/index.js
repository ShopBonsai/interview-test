// Libraries
import { combineReducers } from "redux";

// Individual reducers
import lastOrderReducer from "./lastOrderReducer";

const rootReducer = combineReducers({
  lastOrder: lastOrderReducer
});

export default rootReducer;
