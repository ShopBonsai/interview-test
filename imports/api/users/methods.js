// import modules
import { Meteor } from "meteor/meteor";

// set server methods
Meteor.methods({
  insertUser: user => {
    const doc = Accounts.createUser(user);
    return doc;
  },
  checkForAccount: email => {
    const result = Accounts.findUserByEmail(email);
    if (result !== undefined) {
      return result._id;
    }
    return false;
  }
});
