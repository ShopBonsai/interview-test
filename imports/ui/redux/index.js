import { applyMiddleware, combineReducers, compose } from "redux";
import OrdersRedux, { ordersEpic } from "./OrdersRedux.js";

import createHistory from "history/createBrowserHistory";

import { routerMiddleware } from "react-router-redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

export const history = createHistory();

const epics = combineEpics(ordersEpic);
const middlewares = [createEpicMiddleware(epics), routerMiddleware(history)];
export const middleware = compose(applyMiddleware(...middlewares));

export const rootReducer = combineReducers({
  orders: OrdersRedux
});
