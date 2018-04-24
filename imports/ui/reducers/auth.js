import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

export const SET_USER = 'auth/SET_USER'
export const UNSET_USER = 'auth/UNSET_USER'

export const ERROR = 'auth/ERROR'

const initialState = {
  authenticated:false,          
  userId:null,
  emails:[],
  error:null 
}

function auth(state = initialState, action) {  
  switch (action.type) {
    // get all the orders that have been done by this user from the database
    case SET_USER:
      {
        const userId = action.payload._id;
        const emails = action.payload.emails;
        let s = {authenticated:true, userId,emails, error:null};
        return s;
      }
    case UNSET_USER:
      {
        let s = {authenticated:false, user:{}, error:null};
        return s;
      }
    case ERROR:
      { 
        let s = {authenticated:false, user:{}, error:action.payload};
      }
    case '':
    default:
      return state
  }
}

export default auth


export const loginUser = ({email,password}) => {
    return dispatch => {
      Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        console.log("There was an error:" + error.reason);
        dispatch({
          type:ERROR,
          payload:error.reason
        })
      } else {
        const user = Meteor.user();
        console.log(user);
        dispatch({
          type:SET_USER,
          payload:user
        })
      }
    });
    }
}

export const logoutUser = () => {
    return dispatch => {
      console.log("logging out.")
    }
}

export const registerUser = (user) => {
    return dispatch => {
      Accounts.createUser(user,
      function(error) {
        if (error) {
          console.log("there was an error: " + error.reason);
          dispatch({
            type:ERROR,
            payload:erro.reason
          })
        } else { 
          console.log("I just registered.")
        };
      })
    }
}

export const getProfile = () => {
   return dispatch => {
     
  } 
}