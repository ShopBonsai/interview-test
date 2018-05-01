// import modules
import { Meteor } from "meteor/meteor";
import colors from "colors";
// import apis
import Brands from "../../api/brands/collection";
import Categories from "../../api/categories/collection";
import ProfileTypes from "../../api/profileTypes/collection";
import OrderStatus from "../../api/orderStatus/collection";
import Products from "../../api/products/collection";
import Merchants from "../../api/merchants/collection";
import Customers from "../../api/customers/collection";
import Orders from "../../api/orders/collection";

import mockMerchantData from "./mockMerchantData.json";

// startup function
Meteor.startup(() => {
  console.log('MOCK DATA LENGTH:'.yellow, mockMerchantData.length);
});
