// Import meteor
import { Meteor } from "meteor/meteor";

// Convert Meteor.call to Promise
export const call = (action, payload) => {
  return new Promise((resolve, reject) => {
    Meteor.call(action, payload, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};
