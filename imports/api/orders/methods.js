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

/**
 * Get orders
 *
 * @returns {Object} All order objects.
 */

export const getOrders = () => {
  let orderData;
  try {
    orderData = Orders.find({}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrders.findOrFetchError`,
      `Could not find or fetch orders`,
      error
    );
  }
  return orderData;
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder":  getLastOrder,
  "orders.getOrderById":  getOrderById,
  "orders.getOrders":     getOrders,
});
