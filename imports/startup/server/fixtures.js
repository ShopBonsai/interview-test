// import modules
import { Meteor } from "meteor/meteor";
// import components
import seed from "./seeder";
import Products from "../../api/products/collection";

// startup function
Meteor.startup(() => {
  // clear and seed all database
  seed(process.env.SEED_QUANTITY);

  // clear and seed amount only if db empty
  // if (Products.find().count() <= 0) {
  //   console.log("Server starting without seeding".yellow);
  //   return seed(10);
  // }
});
