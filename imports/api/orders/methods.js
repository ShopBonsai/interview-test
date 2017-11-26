// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";
import { Merchants } from "../merchants/collection";
import { getMerchants, getProductById } from "../merchants/methods";

/**
 * Get the most recently created order, not safe for production
 *
 * @returns {Object} A single order object.
 */
export const getLastOrder = () => {
  const options = { sort: { createdAt: -1 }, limit: 1 };
  try {
    const lastOrderCursor = Orders.find({}, options);
    return lastOrderCursor.fetch()[0];
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
    return Orders.findOne(orderId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${orderId}'`,
      error
    );
  }
};

/**
 * Get an order by id
 *
 * @returns {Object} A single order object.
 */
export const addNewOrder = orderArr => {
  try {
    if (verifyOrderToInventory(orderArr)) {
      return new Meteor.Error(`Not enough inventory quantity`);
    }

    orderArr.forEach(item => {
      const inventoryProduct = getProductById(item.productId);
      const newQtyRemaining = inventoryProduct.quantity - item.quantity;
      Merchants.update(
        { "products.id": item.productId },
        { $set: { "products.$.quantity": newQtyRemaining } }
      );
    });
    Orders.insert({
      products: orderArr,
      customer: "Anonymous",
      purchaseDate: Date.now()
    });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order`,
      error
    );
  }
};

export const verifyOrderToInventory = orderArr => {
  try {
    const check = orderArr.filter(item => {
      const inventoryProduct = getProductById(item.productId);
      if (inventoryProduct.quantity < item.quantity) {
        return true;
      }
    });
    return check.length !== 0;
  } catch (error) {
    throw new Meteor.Error(`${__filename}:verifyOrderToInventory`, error);
  }
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.addNewOrder": addNewOrder
});
