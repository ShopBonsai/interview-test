import {ADD_PRODUCTS} from '../actions/products.js';

const defaultState = {
  merchants : []
}

export default function productsReducer(state = defaultState, {type, payload}) {
  switch(type) {
    case ADD_PRODUCTS : {
      return {merchants: payload}
    }
    default: return state;
  }
}