// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Merchants = new Mongo.Collection("merchants");

// set schema for players
const MerchantSchema = new SimpleSchema({
  profileType: { type: String },
  name: { type: String },
  commission: { type: Number },
  logo: { type: String },
  phone: { type: String },
  address: { type: String },
  description: { type: String },
  createdAt: {
    type: Date,
    autoValue: () => new Date()
  },
  updatedAt: {
    type: Date,
    autoValue: () => new Date()
  }
});

// add schema to players collection
Merchants.attachSchema(MerchantSchema);

// export module
export default Merchants;
