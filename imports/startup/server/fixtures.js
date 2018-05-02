// import modules
import { Meteor } from "meteor/meteor";
// import components
import seed from "./seeder";
import Products from "../../api/products/collection";

// startup function
Meteor.startup(() => {
  // clear and seed database
  if (Products.find().count() <= 0) {
    return seed(10);
  }
  console.log("Server starting without seeding".yellow);
});
