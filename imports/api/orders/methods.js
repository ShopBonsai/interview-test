// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";

/**
 * Get the most recently created order, not safe for production
 *
 * @returns {Object} A single order object.
 */
export const getLastOrder = () => {
  const options = { sort: { createdAt: -1 }, limit: 1 };
  try {
    const lastOrderCursor = Products.find({}, options);
    const lastOrder = lastOrderCursor.fetch()[0];
    return lastOrder;
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLastOrder.findOrFetchError`,
      `Could not find or fetch product. Got error: ${error}`,
      error
    );
  }
};

/**
 * Get an order by id
 *
 * @returns {Object} A single order object.
 */
export const getOrderById = orderId => {
  try {
    return Products.findOne(orderId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${orderId}'`,
      error
    );
  }
};

/*
    this is the api fuction service 
    responsible calsulate thte order amount 
    due and store it in the mongo database
*/
export const finishPurchase = (items) => {
   try{
      console.log(items);
      const amountDue = calculateAmountDue(items);
      
      Orders.insert({
         orderDate : new Date(),
         items : items,
         amount : amountDue 
      });     
      return amountDue 
   } catch (error) {
      throw new Meteor.Error(
        "error while saving order",
      error
    );
  }  
} 

/*
  this funcion calculates the amount due of an offer
*/ 
calculateAmountDue = (items) => {
  const amount = items.reduce((amtDue,item) => amtDue + item.quantity * item.product.price,0);
  return amount;
} 

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.finishPurchase": finishPurchase
});
