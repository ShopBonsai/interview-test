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
    const lastOrderCursor = Orders.find({}, options);
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
 * Get Tracking number
 * Fake random number generated, should be replaced with a real one
 * once tracking API integrated.
 *
 * @returns {Object} A single order object.
 */
const trackingNumber = () => {
  return Math.random().toString(36).slice(2).toUpperCase();
};
/**
 * Add order
 *
 * @returns {string} Newly added order id
 */
export const addOrder = ({ merchantGuid, productId }) => {
  try {
    const orderId = Orders.insert({
      merchantGuid,
      productId,
      trackingNumber: trackingNumber(),
      dateCreated: new Date().toISOString()
    });

    return Orders.findOne(orderId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:addOrder.insert`,
      `Could not insert or findOne order with merchantGuid: '${merchantGuid}' and productId: '${productId}'`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.addOrder": addOrder
});
