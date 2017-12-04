// Redux
import { createStore, combineReducers, applyMiddleware } from "redux";

// Redux reducers
import purchased from "./reducers/purchased";
import user from "./reducers/user";
import merchants from "./reducers/merchants";

// Redux thunk to make async actions
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  purchased,
  user,
  merchants
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
