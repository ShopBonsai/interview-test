// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";
import { getMerchants } from "../merchants/collection";

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

export const mapOrdersFromMerchants = () => {
  try {
    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = getMerchants().reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return products;
  } catch (err) {
    throw new Meteor.Error(
      `${__filename}:mapOrdersFromMerchants.findOrFetchError`,
      `Could not retrieve orders from merchants' collection`,
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
    const inventory = mapOrdersFromMerchants();
    
    orderArr.forEach(item => {
      Merchants.findOne();
    });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${orderId}'`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById
});
