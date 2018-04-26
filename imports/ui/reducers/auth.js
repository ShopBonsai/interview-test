import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

export const SET_USER = 'auth/SET_USER'
export const UNSET_USER = 'auth/UNSET_USER'

export const SET_PROFILE = 'auth/SET_PROFILE'
export const SET_FAVORITES = 'auth/SET_FAVORITES'
export const ERROR = 'auth/ERROR'

const initialState = {
  authenticated:false,          
  userId:null,
  emails:[],
  error:null,
  profile:{
    favorites:[]
  }
}

function auth(state = initialState, action) {  
  switch (action.type) {
    // get all the orders that have been done by this user from the database
    case SET_USER:
      {
        const userId = action.payload._id;
        const emails = action.payload.emails;
        let s = {authenticated:true, userId,emails, error:null, profile:{favorites:[]}};
        return s;
      }
    case SET_PROFILE:
    {
      let s = {...state, profile:action.payload};
      return s;
    }
    case SET_FAVORITES:
    {
      let s = {...state, profile:{favorites:action.payload}};
      return s;
    }
    case UNSET_USER:
      {
        let s = {profile:{favorites:[]},authenticated:false, user:{}, error:null};
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
        dispatch({
          type:SET_USER,
          payload:user
        })
        Meteor.call("profile.getProfile", (error, response) => {
        if (error) {
          dispatch({
            type:ERROR,
            payload:error.reason
          })
        } else {
          dispatch({
            type:SET_PROFILE,
            payload:response
          })
        }
        });
      }
    });
    }
}

export const logoutUser = () => {
    return dispatch => {
      dispatch({
        type:UNSET_USER
      })
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
              payload:error.reason
            })
          } else { 
            console.log("I just registered.")
          };
      })
    }
}

export const getProfile = () => {
   return dispatch => {
     Meteor.call("profile.getProfile", (error, response) => {
        if (error) {
          dispatch({
            type:ERROR,
            payload:error.reason
          })
        } else {
          dispatch({
            type:SET_PROFILE,
            payload:response
          })
        }
      });
  } 
}

export const toggleFavorite = (favoriteId) => {
  return (dispatch,getstate) => {
    let profile = getstate().auth.profile;
    let favorites = [...profile.favorites];
    const index = favorites.findIndex(fId=>fId==favoriteId);
    index > -1 ? (favorites.splice(index,1)) : (favorites.push(favoriteId));
    profile = {...profile,favorites}
    Meteor.call("profile.updateProfile", profile, (error, response) => {
        if (error) {
          dispatch({
            type:ERROR,
            payload:error.reason
          })
        } else {
          dispatch({
            type:SET_FAVORITES,
            payload:response.favorites
          })
        }
      });
  } 
}