// import modules
import { Meteor } from "meteor/meteor";
import colors from "colors";
// import components
import seedData from "./seedData";
import SeedHelper from "./seedHelper";
import mockMerchantData from "../mockMerchantData.json";
import Brands from "../../../api/brands/collection";
import Categories from "../../../api/categories/collection";
import ProfileTypes from "../../../api/profileTypes/collection";
import OrderStatus from "../../../api/orderStatus/collection";
import Products from "../../../api/products/collection";
import Merchants from "../../../api/merchants/collection";
import Customers from "../../../api/customers/collection";
import Orders from "../../../api/orders/collection";

// define module
const seeder = async () => {

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

  // set seed tolal counter
  const totalSeed = {};

  // clear collections
  helper.clearCollections(collections);

  // build categores
  const categories = Object.keys(seedData.categories)
    .map(item => ({ name: item }));
  // console.log(categories);
  const seededCategories = await helper.insertDocs(Categories, categories);
  // console.log("Seeded Categories:".yellow, seededCategories);
  totalSeed[Categories._name] = seededCategories.length;

  // build profileTypes
  const profileTypes = Object.values(seedData.profileTypes)
    .map(item => ({ name: item }));
    // console.log(profileTypes);
  const seededProfileTypes = await helper.insertDocs(ProfileTypes, profileTypes);
  // console.log("Seeded Profile Types:".yellow, seededProfileTypes);
  totalSeed[ProfileTypes._name] = seededProfileTypes.length;

  // build orderStatus
  const orderStatus = Object.values(seedData.orderStatus)
    .map(item => ({ name: item }));
    // console.log(orderStatus);
  const seededOrderStatus = await helper.insertDocs(OrderStatus, orderStatus);
  // console.log("Seeded Order Status:".yellow, seededOrderStatus);
  totalSeed[OrderStatus._name] = seededOrderStatus.length;

  // build merchants
  const merchantProfileType = await ProfileTypes.findOne({ name: 'merchant' });
  const builtMerchants = helper.buildMerchants(mockMerchantData, merchantProfileType);
  // console.log("Built Merchant Profiles:".yellow, builtMerchants);
  const seededMerchants = await helper.insertDocs(Merchants, builtMerchants);
  // console.log("Seeded Merchant Profiles:".yellow, seededMerchants);
  totalSeed[Merchants._name] = seededMerchants.length;

  // build merchants
  const customerProfileType = await ProfileTypes.findOne({ name: 'customer' });
  const builtCustomers = helper.buildCustomers(5, customerProfileType);
  // console.log("Built Customer Profiles:".yellow, builtCustomers);
  const seededCustomers = await helper.insertDocs(Customers, builtCustomers);
  // console.log("Seeded Customer Profile Ids:".yellow, seededCustomers);
  totalSeed[Customers._name] = seededCustomers.length;

  // build users
  const builtUsers = helper.buildUsers(seededMerchants, seededCustomers);
  // console.log("Built Users:".yellow, builtUsers);
  const seededUsers = await helper.insertUsers(builtUsers);
  // console.log("Seeded Users:".yellow, seededUsers);
  totalSeed["users"] = seededUsers.length;

  // log totals
  console.log("Total Seeded:".yellow, totalSeed);

};

// export module
export default seeder;
