// Redux
import {createStore, combineReducers, applyMiddleware} from 'redux';

// Redux reducers
import purchased from './reducers/purchased.js';
import user from './reducers/user.js';
import products from './reducers/products.js'
// Redux thunk to make async actions

import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  purchased,
  user,
  products
})

export const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
)
