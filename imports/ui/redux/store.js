// Redux
import {createStore, combineReducers} from 'redux';
// Redux reducers
import purchased from './reducers/purchased.js';


const rootReducer = combineReducers({
  purchased
})

export const store = createStore(rootReducer)
