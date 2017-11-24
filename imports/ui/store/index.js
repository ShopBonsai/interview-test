import { createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";

export default createStore(rootReducer);
