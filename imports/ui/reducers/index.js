import { combineReducers } from 'redux'  
import orders from './orders'

const appReducer = combineReducers({  
	orders
});

export default appReducer