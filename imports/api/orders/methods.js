// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";

/**
 * Create a new order or add item to exist order
 *
 * @returns {Object} A single order object.
 */

export const createAndUpdateOrder = (userId, itemInfo) => {
  let userOrder;
  try {
    userOrder = Orders.find({
      userId: userId, 
      compeletePayment: false
    }).fetch()[0];
    if(userOrder){
      let newTotalPrice = parseFloat(itemInfo.totalPrice) + parseFloat(userOrder.totalPrice);
      userOrder.itemInfo.push(itemInfo);
      userOrder = Orders.update(
        { userId: userId },
        { $set: { 
              itemInfo: userOrder.itemInfo,
              totalPrice: newTotalPrice
              } 
        }
      )
    } else {
      userOrder = Orders.insert({
        userId: userId,
        compeletePayment: false,
        createdAt: new Date(),
        itemInfo: [itemInfo],
        totalPrice: itemInfo.totalPrice 
      });
    }
  } catch (error) {
      throw new Meteor.Error(
        `${__filename}:createAndUpdateOrder.findOrFetchError`,
        `Could not find or fetch product. Got error: ${error}`,
        error
      );
  }
}

/**
 * Delete single item in order, since my order collection has completePayment boolean
 *
 * All I need to do is to find a order with incompletePayment status and update it
 *
 * @returns {Object} A single order object.
 */

export const deleteSingleItemInOrder = (userId, deleteItem) => {
  let userOrder;
  try{
    userOrder = Orders.find({userId: userId, compeletePayment: false}).fetch()[0];
    let newTotalPrice = (parseFloat(userOrder.totalPrice) - parseFloat(deleteItem.totalPrice)).toFixed(2);
    let index = userOrder.itemInfo.indexOf(deleteItem);
    let updateItemInfo = userOrder.itemInfo
    updateItemInfo.splice(index, 1);
    userOrder = Orders.update(
      { userId: userId },
      { $set: { 
            itemInfo: updateItemInfo,
            totalPrice: newTotalPrice
            } 
      }
    )
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:deleteSingleItemInOrder.findOrFetchError`,
      `Could not find or fetch product. Got error: ${error}`,
      error
    )  
  }
}

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
 * Get an order by user id
 *
 * @returns {Object} A single order object.
 */
export const getOrderByUserId = userId => {
  try {
    const options = { sort: { createdAt: -1 } };
    return Orders.find({userId: userId}, options).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderByUserId.findOrFetchError`,
      `Could not find or fetch product with user id: '${userId}'`,
      error
    );
  }
}

/**
 * Get an incompelete payment order by user id
 *
 * @returns {Object} A single order object.
 */
export const getIncompeleteOrderByUserId = userId => {
  try {
    const options = { sort: { createdAt: -1 }, limit: 1 };
    return Orders.find({userId: Meteor.userId(), compeletePayment: false }, options).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderByUserId.findOrFetchError`,
      `Could not find or fetch product with user id: '${userId}'`,
      error
    );
  }
}

/**
 * Remove the unpurchased order
 */
export const removeOrderByUserId = userId => {
  try {
    return Orders.remove({userId: userId, compeletePayment: false});
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:removeOrderByUserId.findOrFetchError`,
      `Could not find or fetch product with user id: '${userId}'`,
      error
    );
  }
}

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.getOrderByUserId": getOrderByUserId,
  "orders.getIncompeleteOrderByUserId": getIncompeleteOrderByUserId,
  "orders.createAndUpdateOrder": createAndUpdateOrder,
  "orders.removeOrderByUserId": removeOrderByUserId,
  "orders.deleteSingleItemInOrder": deleteSingleItemInOrder
});
