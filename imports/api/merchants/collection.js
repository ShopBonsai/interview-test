// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Merchants = new Mongo.Collection("merchants");

// set schema for players
const MerchantSchema = new SimpleSchema({
  profileType: { type: Object },
  name: { type: String },
  commission: { type: Number },
  logo: { type: String },
  phone: { type: String },
  address: { type: String },
  description: { type: String },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  },
  updatedAt: {
    type: Date,
    defaultValue: new Date()
  }
});

// add schema to players collection
Merchants.attachSchema(MerchantSchema);

// export module
export default Merchants;
