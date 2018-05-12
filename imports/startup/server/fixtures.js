// import modules
import { Meteor } from "meteor/meteor";
// import components
import seed from "./seeder";
import Products from "../../api/products/collection";

// startup function
Meteor.startup(() => {
  // clear and seed database
  seed();
  // if (Products.find().count() <= 0) {
  //   return seed();
  // }
  // console.log("Server starting without seeding".yellow);
});
