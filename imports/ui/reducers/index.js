import { combineReducers } from 'redux'  
import orders from './orders'
import merchants from './merchants'

const appReducer = combineReducers({  
	orders,
	merchants
});

export default appReducer

