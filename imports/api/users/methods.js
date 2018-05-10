// import modules
import { Meteor } from "meteor/meteor";

// set server methods
Meteor.methods({
  insertUser: user => {
    const doc = Accounts.createUser(user);
    return doc;
  }
});
