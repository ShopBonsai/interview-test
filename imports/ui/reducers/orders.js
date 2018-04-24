import { Meteor } from "meteor/meteor";
import moment from 'moment'

export const SET_ORDERS = 'orders/SET_ORDERS'
export const GET_ORDERS_ERROR = 'orders/GET_ORDERS_ERROR'
export const CREATE_ORDER = 'orders/CREATE_ORDER'
export const ORDER_PROGRESS = 'orders/ORDER_PROGRESS'
export const UPDATE_CART = 'orders/UPDATE_CART'


const initialState = {
  orders:[],          // has all past orders {...item}
  cart:{},            // has all the items for the current order {id,quantity}
  progress:false,     // flag to check if committing or not
  error:false
}


function orders(state = initialState, action) {  
  switch (action.type) {
    // get all the orders that have been done by this user from the database
    case SET_ORDERS:
      {
        let s = {...state,orders:action.payload};
        return s;
      }
    // commit the current cart to the database once it has been pushed
    case CREATE_ORDER:
      {
        let s = {...state,orders:action.payload, cart:{}};
        return s;
      }
    // 
    case ORDER_PROGRESS:
      {
        let s = {...state,progress:!state.progress};
        return s;
      }

    case UPDATE_CART: // id and quantity
      {
        const {id,quantity} = action.payload;
        let cart = {...state.cart};
        if(cart[id]){
          const quantityOld = cart[id];
          const quantityNew = quantityOld + quantity;
          quantityNew > 0 ? cart[id] = quantityNew : cart[id]=null;
        } 
        else {
          cart[id] = quantity > 0 ? quantity : null;
        }

        let s = {...state,cart};
        return s;
      }
    case '':
    default:
      return state
  }
}

export default orders


export const createOrder = (order,goBack) => {
    return dispatch => {
      dispatch({
        type:CREATE_ORDER,
        payload:order
      })
      goBack();
    }
}

export const progressOrder = () => {
    return dispatch => {
      console.log("progressOrder dispatched")
    }
}

export const getOrders = () => {
    return dispatch => {
      Meteor.call("orders.getOrders", (error, response) => {
        if (error) {
          dispatch({
            type:GET_ORDERS_ERROR
          })
        } else {
          dispatch({
            type:SET_ORDERS,
            payload:response
          })
        }
      });
    }
}

export const updateCart = (id,quantity) => {
    return dispatch => {
      console.log("updateCart dispatched: ")
      dispatch({
        type:UPDATE_CART,
        payload:{id,quantity}
      })
    }
}