import {call} from '../../meteorHelper';


export const ADD_PRODUCTS = 'ADD_RPODUCTS';


export const getProducts = () => dispatch => {
  call("merchants.getMerchants")
    .then(results => {
      dispatch(setProducts(results))
    })
}


const setProducts = (products) => {
  return {
    type: ADD_PRODUCTS,
    payload: products
  }
}