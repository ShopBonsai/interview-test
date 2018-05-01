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
import seedData from "./seedData";
import SeedHelper from "./seedHelper";

// startup function
Meteor.startup(async () => {
  // cheeck seed data length
  console.log('Mock Data Items:'.yellow, mockMerchantData.length);
  // collect collections
  const collections = [
    Brands,
    Categories,
    ProfileTypes,
    OrderStatus,
    Products,
    Merchants,
    Customers,
    Orders
  ];
  // instantiate new SeedHelper
  const helper = new SeedHelper;
  // clear collections
  helper.clearCollections(collections);

  // build categores
  const categories = Object.keys(seedData.categories)
    .map(item => ({ name: item }));
  // console.log(categories);
  const seededCategories = await helper.insertDocs(collections[1], categories);
  // console.log("Seeded Categories:".yellow, seededCategories);

  // build profileTypes
  const profileTypes = Object.values(seedData.profileTypes)
    .map(item => ({ name: item }));
    // console.log(profileTypes);
  const seededProfileTypes = await helper.insertDocs(collections[2], profileTypes);
  // console.log("Seeded Profile Types:".yellow, seededProfileTypes);

  // build orderStatus
  const orderStatus = Object.values(seedData.orderStatus)
    .map(item => ({ name: item }));
    // console.log(orderStatus);
  const seededOrderStatus = await helper.insertDocs(collections[3], orderStatus);
  // console.log("Seeded Order Status:".yellow, seededOrderStatus);
});
