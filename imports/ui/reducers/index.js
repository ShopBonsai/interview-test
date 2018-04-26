import { combineReducers } from 'redux'  
import orders from './orders'
import merchants from './merchants'
import auth from './auth'

const appReducer = combineReducers({  
	orders,
	merchants,
	auth
});

export default appReducer

