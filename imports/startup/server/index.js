// import modules
import { Meteor } from "meteor/meteor";
import "./registerApis";
import "./fixtures";
import Brands from "../../api/brands/collection";
import Categories from "../../api/categories/collection";
import Customers from "../../api/customers/collection";
import Merchants from "../../api/merchants/collection";
import Orders from "../../api/orders/collection";
import OrderStatus from "../../api/orderStatus/collection";
import Products from "../../api/products/collection";
import ProfileTypes from "../../api/profileTypes/collection";

// startup function
Meteor.startup(() => {
  Meteor.publish("brands", () => Brands.find());
  Meteor.publish("categories", () => Categories.find());
  Meteor.publish("customers", () => Customers.find());
  Meteor.publish("merchants", () => Merchants.find());
  Meteor.publish("orders", () => Orders.find());
  Meteor.publish("orderStatus", () => OrderStatus.find());
  Meteor.publish("products", () => Products.find());
  Meteor.publish("profileTypes", () => ProfileTypes.find());
  Meteor.publish("users", () =>
    Meteor.users.find(
      {},
      {
        fields: {
          username: 1,
          profile: 1,
          emails: 1
        }
      }
    )
  );
});
