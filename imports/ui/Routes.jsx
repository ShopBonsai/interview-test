// Framework
import React from "react";
import createHistory from 'history/createBrowserHistory'
import { Route } from "react-router";
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import rootReducer from './reducer'

// MiddleWares
const history = createHistory()
const router = routerMiddleware(history)
const logger = createLogger()

//Redux Store
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    router,
    logger // neat middleware that logs actions
  )
)

// Pages
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx"

const Routes = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/orders" component={Orders} />
      </div>
    </ConnectedRouter>
  </Provider>;

export default Routes;
