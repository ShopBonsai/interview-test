// import modules
import "./registerApis";
import "./fixtures";
import { Meteor } from "meteor/meteor";
import ProfileTypes from "../../api/profileTypes/collection";
import Categories from "../../api/categories/collection";
import Brands from "../../api/brands/collection";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";
// import OrderStatus from "../../api/orderStatus/collection";
// import Customers from "../../api/customers/collection";
// import Orders from "../../api/orders/collection";

// startup function
Meteor.startup(() => {
  Meteor.publish("profileTypes", () =>
    ProfileTypes.find({}, { fields: { name: 1 } })
  );
  Meteor.publish("categories", () => Categories.find());
  Meteor.publish("brands", () => Brands.find());
  Meteor.publish("merchants", () => Merchants.find());
  Meteor.publish("products", () => Products.find());
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
