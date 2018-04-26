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

// Register meteor methods.
Meteor.methods({
  "merchants.getMerchantById": getMerchantById,
  "merchants.getMerchants": getMerchants
});
