import { combineReducers } from "redux";

import lastOrderReducer from "./lastOrderReducer";

const rootReducer = combineReducers({
  lastOrder: lastOrderReducer
});

export default rootReducer;
