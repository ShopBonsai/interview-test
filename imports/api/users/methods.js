// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Users } from "./collection";


/**
 * Create a purchase
 * 
 * @return {Object} A user
 */

 export const createUser = (user) => {
    try {
      user = user || {
        likes: [],
        createdAt : new Date(),
      }
      const getUser = Users.insert(user);

      return {
        success: true,
        _id: getUser
      };
    } catch(error) {
      return {success: false, error};
    }
 }

 export const getUser = (_id) => {
  try {
    const getUser = Users.findOne({_id});
    return getUser;
  } catch(error) {
    return {error};
  }
}


// Register meteor methods.
Meteor.methods({
  "users.createUser": createUser,
  "users.getUser": getUser,
});
