// import modules
import { Meteor } from "meteor/meteor";
// import components
import seed from "./seeder";
import Products from "../../api/products/collection";

// startup function
Meteor.startup(() => {
  // clear and seed all database
  if (process.env.SEED_QUANTITY > 0) {
    return seed(process.env.SEED_QUANTITY);
  }

  // clear and seed amount only if db empty
  if (process.env.SEED_QUANTITY === undefined && Products.find().count() < 1) {
    return seed(33);
  }
  return console.log("Server starting without seeding".yellow);
});
