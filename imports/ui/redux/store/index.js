import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

import rootReducer from "../reducers";

const middleware = applyMiddleware(Thunk);
const store = createStore(rootReducer, middleware);

export default store;
