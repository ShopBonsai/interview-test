// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";
import { Merchants } from "../merchants/collection";

/**
 * Get the most recently created order, not safe for production
 *
 * @returns {Object} A single order object.
 */
// export const getLastOrder = () => {
//   const options = { sort: { createdAt: -1 }, limit: 1 };
//   try {
//     const lastOrderCursor = Products.find({}, options);
//     const lastOrder = lastOrderCursor.fetch()[0];
//     return lastOrder;
//   } catch (error) {
//     throw new Meteor.Error(
//       `${__filename}:getLastOrder.findOrFetchError`,
//       `Could not find or fetch product. Got error: ${error}`,
//       error
//     );
//   }
// };

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
 * Create a new Order - the new order is a Cart with default value as UnPaid
 * 
 * @returns number Unique System Order ID
 */
export const createNewOrder = () => {
  try {
    return Orders.insert({
      Products: []
    });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createNewOrder.createError`,
      `Could not create new order`,
      error
    );
  }
};

/**
 * Update Order - Update the order which is under processing
 * 
 * @returns number Unique System Order ID
 */
export const updateOrder = Order => {
  try {
    let O = {
      ...Order
    };
    delete O.id;
    return Orders.update(Order.id, O);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:updateOrder.updateError`,
      `Could not Update Order ${O._id}`,
      error
    );
  }
};

/**
 * Place Order - Updates the Order Status in Order provided and Updates the Quantity in the Product
 * 
 * @returns boolean
 */
export const placeOrder = Order => {
  try {
    let O = {
      ...Order
    };
    delete O.id;
    O.status = "Success";

    let MerchantsObjToUpdate = {};
    let SelectedProductsIndex = [];

    SelectedProductsIndex = Order.products.map(Product => {
      const merchant = Merchants.findOne({
        _id: Product.merchant
      });

      const productIdx = merchant.products.findIndex(
        product => product.id === Product.id
      );

      MerchantsObjToUpdate[merchant._id] = merchant;
      return {
        merchant: Product.merchant,
        productIdx: productIdx
      };
    });

    let productOutOfStock = false;
    /* Check final availability */
    SelectedProductsIndex.forEach(selectedProduct => {
      const currentQuantity =
        MerchantsObjToUpdate[selectedProduct["merchant"]]["products"][
          selectedProduct["productIdx"]
        ].quantity;

      if (currentQuantity !== 0) {
        MerchantsObjToUpdate[selectedProduct["merchant"]]["products"][
          selectedProduct["productIdx"]
        ].quantity =
          MerchantsObjToUpdate[selectedProduct["merchant"]]["products"][
            selectedProduct["productIdx"]
          ].quantity - 1;
      } else {
        productOutOfStock = true;
        return false;
      }
    });

    if (productOutOfStock) {
      return false;
    } else {
      Object.keys(MerchantsObjToUpdate).forEach(key => {
        let M = {
          ...MerchantsObjToUpdate[key]
        };
        Merchants.update(key, M);
      });

      return Orders.update(Order.id, O);
    }
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:placeOrder.placeOrderError`,
      `Cannot Place Order ${Order.id}`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "orders.createNewOrder": createNewOrder,
  "orders.updateOrder": updateOrder,
  "orders.getOrderById": getOrderById,
  "orders.placeOrder": placeOrder
});

// "orders.getLastOrder": getLastOrder,
