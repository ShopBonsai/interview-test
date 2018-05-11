// import modules
import { Meteor } from "meteor/meteor";
import Products from "./collection";

// set server methods
Meteor.methods({
  dropQuantities: orderProducts => {
    // console.log("ORDER PRODUCTS".magenta, orderProducts);
    const promises = orderProducts.map(
      orderItem =>
        new Promise((resolve, reject) => {
          // console.log("ORDER ITEM".magenta, orderItem);
          const stockProducts = Products.find({ _id: orderItem.id }).fetch();
          if (stockProducts.length < 1) {
            return reject("No Product");
          }
          // console.log("STOCK PRODUCTS",  stockProducts);
          const stockProduct = stockProducts[0];
          // console.log("STOCK PRODUCT".magenta, stockProduct.quantity, typeof stockProduct.quantity, orderItem.quantity, typeof orderItem.quantity);
          let newQuantity =
            parseInt(stockProduct.quantity) - parseInt(orderItem.quantity);
          if (newQuantity < 0) {
            newQuantity = 0;
          }
          // console.log("NEW QUANTITY".magenta, newQuantity, typeof newQuantity);
          try {
            const update = Products.update(orderItem.id, {
              $set: {
                quantity: newQuantity
              }
            });
            // console.log("UPDATE".yellow, update);
            if (update !== 1) return reject(update);
            return resolve(update);
          } catch (e) {
            return reject(e);
          }
        })
    );
    return Promise.all(promises)
      .then(status => {
        // console.log("STATUS".magenta, status);
        return status;
      })
      .catch(err => Meteor.Error(err));
  }
});
