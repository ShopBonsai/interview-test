// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Users } from "./collection";


/**
 * Create a user
 * 
 * @return {Object} A user
 */

 export const createUser = (user) => {
    try {
      user = user || {
        favorites: [],
        createdAt : new Date(),
      }
      const userID = Users.insert(user);
      return getUserByID(userID);
    } catch(error) {
      return {success: false, error};
    }
 }

 /**
  * Get user by ID
  * @param {User} _id 
  */

 export const getUserByID = (_id) => {
  try {
    const getUser = Users.findOne({_id});
    return getUser;
  } catch(error) {
    return {error};
  }
}


/**
  * Update user by ID
  * @param {User} _id 
  */

  export const updateUserByID = (user) => {
    try {
      const getUser = Users.update(user._id, user);
      return {
        user
      };
    } catch(error) {
      return {error};
    }
  }

// Register meteor methods.
Meteor.methods({
  "users.createUser": createUser,
  "users.getUserByID": getUserByID,
  "users.updateUserByID": updateUserByID,
});
