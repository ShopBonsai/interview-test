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

 export const createUser = ({user = {}}) => {
    try {
      const getUser = Users.insert(user);
      return {
        success: true,
        userID: getUser
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
  "purchases.createUser": createPurchase,
  "purchases.getUser": getUSer,
});
