import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";

const middleware = applyMiddleware();

const configureStore = initialState =>
  createStore(rootReducer, initialState, middleware);

export default configureStore;
