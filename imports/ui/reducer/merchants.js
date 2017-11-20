import { GET_MERCHANTS } from './../actions/types'
import { combineReducers } from 'redux'

const { REQUEST, SUCCESS, ERROR } = GET_MERCHANTS

const data = (state = [], action) => {
    switch (action.type) {
        case SUCCESS:
            return action.merchants
        case ERROR:
            return []
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case ERROR:
            return action.error
        case SUCCESS:
        case REQUEST:
            return null
        default:
            return state;
    }
}

export default combineReducers({
    data,
    error
})

export const stateSelector = (state) => {
    return state.merchants
}