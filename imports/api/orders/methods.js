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
 * The order object contains information in this order.
 * 
 * {
 *  "id": "2b9c51f8-f09c-4bc7-99e3-4ce1b3431c91",
 *  "customerUserId": "2b9c51f8-f09c-4bc7-99e3-4ce1b3431c92",
 *  "status": "RECEIVED"
 *  "total": 1200
 *  "products": [
 *    {
*        "belongsToBrand": 2,
*        "id": "2b9c51f8-f09c-4bc7-99e3-4ce1b3431c99",
*        "name": "CULPA Shoes",
*        "price": 400,
*        "description": "Do proident est ut do dolor eiusmod.",
*        "color": "velit",
*        "size": "S",
*        "quantity": 0,
*        "image": "https://picsum.photos/300/?random"
*     },
*     {
*        "belongsToBrand": 1,
*        "id": "d564d010-24bf-4236-aa3e-4994912a4b4d",
*        "name": "TEMPOR Slippers",
*        "price": 800,
*        "description": "Commodo amet eu cillum nostrud consectetur incididunt magna est velit commodo id pariatur ut irure.",
*        "color": "sunt",
*        "size": "L",
*        "quantity": 9,
*        "image": "https://picsum.photos/300/?random"
*      }
 *  ]
 * }
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
 * Create an order
 *
 * @returns "String" Stating whether insertion was successful or not  .
 */
export const createOrder = order => {
  try {
    return Orders.insert(order);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createOrder.findOrFetchError`,
      `Could not create order`,
      error
    );
  }
};

/**
 * Get all orders for current user
 *
 * @returns [Array] of Order Objects.
 */
export const getOrders = () => {
  let orders
  try {
    orders = Orders.find({}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrders.findOrFetchError`,
      `Could not fetch orders`,
      error
    );
  }
  return orders;
}

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.createOrder": createOrder,
  "orders.getOrders": getOrders
});
