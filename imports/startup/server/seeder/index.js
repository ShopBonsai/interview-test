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
const seed = async limit => {
  console.log("Server starting with seeding".yellow);
  console.time("seeder");

  // cheeck seed data length
  const totalMocks = mockMerchantData.length;
  // console.log('Mock Items:'.yellow, totalMocks);

  // collect collections
  const collections = [
    Meteor.users,
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
  const helper = new SeedHelper();

  // set seed tolal counter
  const seeded = {};

  // clear collections
  helper.clearCollections(collections);

  // build categores
  const categories = Object.keys(seedData.categories).map(item => ({
    name: item
  }));
  // console.log(categories);
  const seededCategories = await helper.insertDocs(Categories, categories);
  // console.log("Seeded Categories:".yellow, seededCategories);
  seeded[Categories._name] = seededCategories.length;

  // build profileTypes
  const profileTypes = Object.values(seedData.profileTypes).map(item => ({
    name: item
  }));
  // console.log(profileTypes);
  const seededProfileTypes = await helper.insertDocs(
    ProfileTypes,
    profileTypes
  );
  // console.log("Seeded Profile Types:".yellow, seededProfileTypes);
  seeded[ProfileTypes._name] = seededProfileTypes.length;

  // build orderStatus
  const orderStatus = Object.values(seedData.orderStatus).map(item => ({
    name: item
  }));
  // console.log(orderStatus);
  const seededOrderStatus = await helper.insertDocs(OrderStatus, orderStatus);
  // console.log("Seeded Order Status:".yellow, seededOrderStatus);
  seeded[OrderStatus._name] = seededOrderStatus.length;

  // build and seed products with refs merchants, merchant users, brands
  const seededProducts = await helper.buildSeedProducts(
    mockMerchantData,
    limit
  );
  // console.log("Seeded Merchants, Merchant Users, Brands, Products:".yellow, seededProducts, seeded);

  // combine and log totals
  const totalSeeded = { ...seeded, ...seededProducts };
  totalSeeded[Merchants._name] = Merchants.find().count();
  totalSeeded.users = Meteor.users.find().count();
  console.log("Total Seeded:".yellow, totalSeeded);
  console.timeEnd("seeder");
};

// export module
export default seed;
