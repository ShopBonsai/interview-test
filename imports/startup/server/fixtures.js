import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Merchants } from "../../api/merchants/collection.js";
import { Orders } from "../../api/orders/collection.js";
import mockMerchantData from "./mockMerchantData.json";
import { LikedProducts } from "../../api/likedProducts/collection.js";

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    let userId = Accounts.createUser({
      email: "nicholas@nicholas.com",
      password: "pass"
    });
  }
  // If DB is empty, add mock data
  if (Merchants.find().count() === 0) {
    // Create a new database document for each merchant.
    mockMerchantData.products.forEach((merchantData, i) =>
      Merchants.insert({
        ...merchantData
      })
    );
  }
  if (LikedProducts.find().count() === 0) {
    LikedProducts.insert({
      name: "initializing database",
      brand: "",
      price: "",
      liked: true,
      owner: userId
    });
  }
});
