// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";

/**
 *
 * @returns {Object} The order object contains information in this order
 * 
 *  {
 *    "user": {
 *      "email": "jdoe@email.ca",
 *      "password": "u#w(if(0Dp"
 *    },
 *    "dateOrdered": "2017-02-08T10:39:34 +05:00",
 *    "items": [
 *      {
 *        "product": product1,
 *        "quantity": 1
 *      },
 *      {
 *        "product": product2,
 *        "quantity": 3
 *      },
 *    ],
 *    "isCheckOut": false // true if a user finalize a purchase
 *  }
 * 
 * 
 */

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
  let order;
  try {
    order = Orders.findOne(orderId).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${orderId}'`,
      error
    );
  }

  return order;
};

/**
 * Add an order
 *
 * @returns
 */

export const addOrder = (items, user, email) => {
  try {
    return Orders.insert({
      email: email,
      user: user,
      dateOrdered: Date(),
      items: items,
      isCheckOut: false
    });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${orderId}'`,
      error
    );
  }
};

/**
 * Get orders by email
 *
 * @returns {Object} A single order object.
 */
export const getOrdersByEmail = orderEmail => {
  let orders;
  try {
    orders = Orders.find(orderEmail).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrdersByEmail.findOrFetchError`,
      `Could not find or fetch product with order email: '${orderEmail}'`,
      error
    );
  }

  return orders;
};

/**
 * Update orders by id
 *
 * @returns {Object} A single order object.
 */
export const updateOrder = (orderId, newItems) => {
  try {
    Orders.update(
      { _id: orderId }, 
      { $set: { items: newItems, dateOrdered: new Date() } }
    );
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:updateOrder.findOrFetchError`,
      `Could not find or fetch product with order email: '${orderId}'`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.addOrder": addOrder,
  "orders.getOrdersByEmail": getOrdersByEmail,
  "orders.updateOrder": updateOrder
});
