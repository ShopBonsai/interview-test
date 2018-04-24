import { Meteor } from "meteor/meteor";

export const SET_MERCHANTS = 'merchants/SET_MERCHANTS'
export const GET_MERCHANTS_ERROR = 'merchants/GET_MERCHANTS_ERROR'

const initialState = {
  merchants:[],          // the list of merchants
  error:false,            // in case there is an error 
}


function merchants(state = initialState, action) {  
  switch (action.type) {
    // get all the orders that have been done by this user from the database
    case SET_MERCHANTS:
      {
        let s = {error:false,merchants:action.payload};
        return s;
      }
    case GET_MERCHANTS_ERROR:
      {
        let s = {error:true};
        return s;
      }
    case '':
    default:
      return state
  }
}

export default merchants


export const getMerchants = () => {
    return dispatch => {
      console.log("getMerchants dispatched")
      Meteor.call("merchants.getMerchants", (error, response) => {
        if (error) {
          dispatch({
            type:GET_MERCHANTS_ERROR
          })
        } else {
          dispatch({
            type:SET_MERCHANTS,
            payload:response
          })
        }
      });
    }
}