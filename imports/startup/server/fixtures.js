// import modules
import { Meteor } from "meteor/meteor";
import colors from "colors";
// import components
import seeder from "./seeder";

// startup function
Meteor.startup(() => {

  // clear and seed database
  seeder();

});
