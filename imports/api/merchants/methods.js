// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Merchants } from "./collection";

/**
 * Get a merchant object by id
 *
 * @returns {Object} The merchant object contains information in this order
 *
 *  {
 *    "index": 1,
 *    "guid": "51053bbd-5909-432d-82d3-fafbf7a9da34",
 *    "logo": "https://www.fillmurray.com/50/50",
 *    "dateCreated": "2017-02-08T10:39:34 +05:00",
 *    "publishedState": false,
 *    "brands": [
 *      "Booth Wong",
 *      "Eva Hutchinson",
 *      "Cummings Holmes"
 *    ],
 *    "products": [
 *      {
 *        "belongsToBrand": 2,
 *        "id": "2b9c51f8-f09c-4bc7-99e3-4ce1b3431c99",
 *        "name": "CULPA Shoes",
 *        "price": 654.5,
 *        "description": "Do proident est ut do dolor eiusmod.",
 *        "color": "velit",
 *        "size": "S",
 *        "quantity": 0,
 *        "image": "https://picsum.photos/300/?random"
 *      },
 *      {
 *        "belongsToBrand": 1,
 *        "id": "d564d010-24bf-4236-aa3e-4994912a4b4d",
 *        "name": "TEMPOR Slippers",
 *        "price": 863.3,
 *        "description": "Commodo amet eu cillum nostrud consectetur incididunt magna est velit commodo id pariatur ut irure.",
 *        "color": "sunt",
 *        "size": "L",
 *        "quantity": 9,
 *        "image": "https://picsum.photos/300/?random"
 *      }
 *    ],
 *    "merchant": "MOMENTIA",
 *    "commissionFee": "14%",
 *    "contactEmail": "cummingsholmes@momentia.com",
 *    "phone": "+1 (802) 427-2912",
 *    "address": "227 Hazel Court, Conway, Hawaii, 6054",
 *    "publishedDate": "2017-07-21T08:11:20 +04:00",
 *    "publishedBy": {
 *      "userId": "48633d19-8139-4a7e-8ed1-abbe1273be04"
 *    },
 *    "companyDescription": "Aute esse proident consectetur ea eiusmod labore eiusmod consequat consequat labore non mollit. Proident aliquip ea est magna reprehenderit mollit ipsum Lorem tempor aute non est. Minim occaecat aliquip excepteur consectetur eu nisi qui magna.\r\n"
 *  },
 *
 *
 *
 */

/**
 * Gets a merchant by his id
 *
 * @returns {Object} A single order object.
 */
export const getMerchantById = merchantId => {
  let merchant;
  try {
    merchant = Merchants.findOne(merchantId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getMerchantById.findOrFetchError`,
      `Could not find or fetch merchant with order id: '${merchantId}'`,
      error
    );
  }
  return merchant;
};

/**
 * Gets merchant entries
 *
 * @returns {Object} A collection of objects.
 */
export const getMerchants = () => {
  let merchantData;
  try {
    merchantData = Merchants.find({}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getMerchants.findOrFetchError`,
      `Could not find or fetch merchants`,
      error
    );
  }
  return merchantData;
};

/**
 * Sets a merchant product quantity
 *
 * @returns {Object} number of records updated.
 */
export const setProductAvailability = (merchantId, productId, availability) => {
  let merchantData;
  try {
    let merchant = Merchants.findOne({ guid: merchantId });
    let index = -1;
    merchant.products.find(product => {
      index++;
      return product.id === productId;
    });
    merchant.products[index].quantity = availability;
    merchantData = Merchants.update(
      { guid: merchantId },
      { $set: { products: merchant.products } }
    );
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:setProductAvailability.findOrFetchError`,
      `Could not update merchants`,
      error
    );
  }
  return merchantData;
};

/**
 * Gets merchants following a search criteria
 *
 * @returns {Object} A collection of objects.
 */
export const getMerchantsWithPagination = (skip, limit) => {
  let merchantData;
  try {
    merchantData = Merchants.find(
      {},
      {
        limit: limit,
        skip: skip
      }
    ).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getMerchants.findOrFetchError`,
      `Could not find or fetch merchants`,
      error
    );
  }
  return merchantData;
};

/**
 * Sets a merchant product quantity
 *
 * @returns {Object} A collection of objects.
 */
export const rollBackProductAvailability = (
  merchantId,
  productId,
  numOfReturnedProducts
) => {
  let merchantData;
  try {
    let merchant = Merchants.findOne({ guid: merchantId });
    let index = -1;
    merchant.products.find(product => {
      index++;
      return product.id === productId;
    });
    merchant.products[index].quantity =
      parseFloat(merchant.products[index].quantity) +
      parseFloat(numOfReturnedProducts);
    merchantData = Merchants.update(
      { guid: merchantId },
      { $set: { products: merchant.products } }
    );
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:rollBackProductAvailability.findOrFetchError`,
      `Could not update merchants product`,
      error
    );
  }
  return merchantData;
};

/**
 * Returns a product using a merchantId and a productId
 *
 * @returns {Object} A single order object.
 */
export const getProduct = (merchantId, productId) => {
  let product;
  try {
    let merchant = Merchants.findOne({ guid: merchantId });
    let index = -1;
    merchant.products.find(product => {
      index++;
      return product.id === productId;
    });
    product = merchant.products[index];
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getProduct.findOrFetchError`,
      `Could not get product`,
      error
    );
  }
  return product;
};

// Register meteor methods.
Meteor.methods({
  "merchants.setProductAvailability": setProductAvailability,
  "merchants.rollBackProductAvailability": rollBackProductAvailability,
  "merchants.getMerchantById": getMerchantById,
  "merchants.getMerchantsWithPagination": getMerchantsWithPagination,
  "merchants.getProduct": getProduct,
  "merchants.getMerchants": getMerchants
});
