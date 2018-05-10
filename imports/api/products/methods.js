// import modules
import { Meteor } from "meteor/meteor";
import Products from "./collection";

// set server methods
Meteor.methods({
  dropQuantities: products => {
    const promises = products.map(
      product =>
        new Promise((resolve, reject) => {
          const newQuantity =
            parseInt(product.quantity) - parseInt(product.cartQuantity);
          // console.log("New Quantity".magenta, newQuantity, typeof newQuantity);
          try {
            const result = Products.update(product._id, {
              $set: { quantity: newQuantity }
            });
            // console.log("TRY".magenta, result);
            debugger;
            return resolve(result);
          } catch (e) {
            return reject(e);
          }
        })
    );
    return Promise.all(promises)
      .then(result => result)
      .catch(err => Meteor.error(err));
  }
});
