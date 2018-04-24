import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { routerMiddleware, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
// import createHistory from 'history/createBrowserHistory'
import rootReducer from './index'

// export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  // routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)