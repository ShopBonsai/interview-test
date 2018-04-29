import { Meteor } from "meteor/meteor";
import { Merchants } from "../../api/merchants/collection.js";
import { Orders } from "../../api/orders/collection.js";
import mockMerchantData from "./mockMerchantData.json";
import { LikedProducts } from "../../api/likedProducts/collection.js";

Meteor.startup(() => {
  // If DB is empty, add mock data
  if (Merchants.find().count() === 0) {
    // Create a new database document for each merchant.
    mockMerchantData.forEach((merchantData, i) =>
      Merchants.insert({
        ...merchantData
      })
    );
  }
  if (LikedProducts.find().count() === 0) {
    LikedProducts.insert({
      title: "initializing database"
    });
  }
});
