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


const orders = (state = initialState, action) => {  
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
        let s = {...state,orders:[...state.orders,action.payload], cart:{}};
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
        let s = {...state,cart:action.payload};
        return s;
      }
    case '':
    default:
      return state
  }
}

export default orders


export const createOrder = (order) => {
    return (dispatch,getState) => {
      const userId = getState().auth.userId;
      order = {...order,userId};
      Meteor.call("orders.createOrder", order, (error, id) => {
        dispatch({
          type:CREATE_ORDER,
          payload:{...order,id}
        })
      })
    }
}

export const removeAllOrders = (order) => {
    return dispatch => {
      Meteor.call("orders.removeAllOrders", (error, response) => {
 
      })
    }
}

export const getOrders = () => {
    return (dispatch,getState) => {
      Meteor.call("orders.getOrders", (error, response) => {
        if (error) {
          dispatch({
            type:GET_ORDERS_ERROR
          })
        } else {
          response = response.map(({_id,...order})=>({
            ...order,id:_id
          }))
          dispatch({
            type:SET_ORDERS,
            payload:response
          })
        }
      });
    }
}

export const updateCart = (id,quantity) => {
    return (dispatch,getState) => {
      const c = getState().orders.cart;
      let cart = {...c}
      if(cart[id]){
        const quantityOld = cart[id];
        const quantityNew = quantityOld + quantity;
        quantityNew > 0 ? cart[id] = quantityNew : cart[id]=null;
      } 
      else {
        cart[id] = quantity > 0 ? quantity : null;
      }
      if( getState().auth.userId ){

        Meteor.call("orders.createOrUpdateCart", cart ,(error, response) => {
          if (error) {
          } else {
            dispatch({type:UPDATE_CART,payload:response.products})
          }
        });
      } else {
        dispatch({type:UPDATE_CART,payload:cart})
      }
    }
}