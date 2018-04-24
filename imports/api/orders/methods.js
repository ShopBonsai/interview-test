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
      `Could not find or fetch order with order id: '${orderId}'`,
      error
    );
  }
};

export const createOrder = (order) => {
  try {
    return Orders.insert(order);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createOrder.createError`,
      `Could not create a new order`,
      error
    )
  }
}

export const getOrders = (userId) => {
  let ordersData;
  try {
    ordersData = Orders.find({userId}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrders.findOrFetchError`,
      `Could not find or fetch orders`,
      error
    );
  }
  return ordersData;
};

export const removeAllOrders = () => {
  let ordersData;
  try {
    ordersData = Orders.remove({});
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:removeAllOrders.Error`,
      `Could not remove orders`,
      error
    );
  }
  return ordersData;
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.createOrder" : createOrder,
  "orders.getOrders" : getOrders,
  "orders.removeAllOrders" : removeAllOrders
});
