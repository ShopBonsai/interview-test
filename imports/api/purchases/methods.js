// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Purchases } from "./collection";

/**
 * Create a purchase 
 * 
 * @return {Object} A purchase
 */

export const createPurchase = ({ userID, product }) => {
  const purchase = {
    userID,
    product,
    created: new Date()
  };

  try {
    const getPurchase = Purchases.insert(purchase);
    return {
      success: true,
      purchaseID: getPurchase
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

// Register meteor methods.
Meteor.methods({
  "purchases.createPurchase": createPurchase
});
