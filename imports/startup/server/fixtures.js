// import modules
import { Meteor } from "meteor/meteor";
// import components
import seed from "./seeder";

// startup function
Meteor.startup(() => {

  // clear and seed database
  seed();

});
