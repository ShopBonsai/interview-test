
import {call} from '../../meteorHelper';
import cookie from 'js-cookie';


// user cookie name
const userCookie = 'test-user-id';

// Action Types
export const SET_USER = 'SET_USER';


/**
 * Get user from DB, if it doesn't exist in the session, create it
 * @param {number} id 
 * @return {Promise} 
 */
export const getUser = (id) => (dispatch, getState) => {
  const {user} = getState();

  // Get user ID
  const userID = id || user._id || cookie.get(userCookie)


  // Make request to create or to get user
  let userResult = call(!userID ? 
      'users.createUser' :
      'users.getUserByID', userID);

  /**
   * Handle response, add cookie and set user to the store
   * @return {Promise<Object>}
   */
  return userResult
    .then(result => {
      cookie.set(userCookie, result._id, {expires: 1});
      dispatch(setUser(result));
      return result
    })
    .catch(alert)
}


/**
 * Update user data
 * @param {Promise<Object>} user 
 */
export const updateUser = user => (dispatch, getState) => {
  if (!user) {
    user = getState().user;
  }

  return call('users.updateUserByID', user)
    .then(result => {
      dispatch(setUser(result))
    })
    .catch(alert)
}

/**
 * Add product to user favourites
 * @param {Promise<Object>} addToFavorites
 */

 export const addToFavorites = product => (dispatch, getState) => {
   debugger;
   const {user} = getState();
   
  const favorites = [...user.favorites, product];

  return dispatch(updateUser({...user, favorites}))
 }

export const setUser = (user) => {
  return {
    payload: user,
    type: SET_USER
  }
}
