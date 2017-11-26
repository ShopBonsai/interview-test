import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

/**
 * Initialize the redux-saga middleware
 * @type {SagaMiddleware<object>}
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Create the Store
 */
export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);
