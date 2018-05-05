// import modules
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storeLogger from "./storeLogger";
import reducer from "./reducers/index";

// set factory to use thunks, logger
const factory = (inputState, flag = null) =>
  flag === "logger"
    ? applyMiddleware(thunk, storeLogger)(createStore)(reducer, inputState)
    : applyMiddleware(thunk)(createStore)(reducer, inputState);

// export factory for store
export default factory;
