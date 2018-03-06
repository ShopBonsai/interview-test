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
    return Orders.findOne(orderId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch order with order id: '${orderId}'`,
      error
    );
  }
};

/**
 * Get an order by username
 *
 * @returns {Object} A single order object.
 */
export const getOrdersByUserName = userName => {
  try {
    return Orders.find({ userName: userName }).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrdersByUserName.findOrFetchError`,
      `Could not find orders for user name:`,
      error
    );
  }
};

/**
 * Inserts a new order
 *
 * @returns {Object} A single order object.
 */
export const insertOrder = order => {
  try {
    return Orders.insert(order);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:insertOrder.findOrFetchError`,
      `Could not insert order`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "orders.insertOrder": insertOrder,
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.getOrdersByUserName": getOrdersByUserName
});
