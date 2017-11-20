import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import merchants from './merchants'
import products from './products'

export default combineReducers({
    merchants,
    products,
    routing
})