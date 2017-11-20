import { GET_MERCHANTS, FILL_PRODUCTS } from './../actions/types'
import { combineReducers } from 'redux'

const { REQUEST, SUCCESS, ERROR } = GET_MERCHANTS

const data = (state = [], action) => {
    switch (action.type) {
        case FILL_PRODUCTS:
            return action.products
        default:
            return state
    }
}

const loading = (state = true, action) => {
    switch (action.type) {
        case FILL_PRODUCTS:
            return false
        case REQUEST:
            return true
        default:
            return state
    }
}

export default combineReducers({
    data,
    loading,
})

export const stateSelector = (state) => {
    return state.products
}