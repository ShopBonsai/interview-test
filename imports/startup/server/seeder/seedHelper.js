// import modules
import { Accounts } from "meteor/accounts-base";
import faker from "faker";
import seedData from "./seedData";
import Brands from "../../../api/brands/collection";
import Categories from "../../../api/categories/collection";
import ProfileTypes from "../../../api/profileTypes/collection";
import Products from "../../../api/products/collection";
import Merchants from "../../../api/merchants/collection";

// define class module
class SeedHelper {
  constructor() {
    this.clearCollections = this.clearCollections.bind(this);
    this.insertDoc = this.insertDoc.bind(this);
    this.insertDocs = this.insertDocs.bind(this);
  }
  clearCollections(collections) {
    collections.forEach(collection => {
      collection.remove({});
      // console.log("Removed Collection:".yellow, collection._name);
    });
  }
  insertDoc(collection, doc) {
    return new Promise((resolve, reject) => {
      const result = collection.insert(doc, (err, id) => {
        if (err) return reject(err);
        return id;
      });
      return resolve(result);
    });
  }
  insertDocs(collection, docs) {
    // console.log(collection._name, docs);
    const promises = docs.map(doc => this.insertDoc(collection, doc));
    return Promise.all(promises).then(
      seeded => seeded,
      err => new Meteor.Error(err)
    );
  }
  buildAddress() {
    const result = [
      faker.address.streetAddress(),
      faker.address.city(),
      faker.address.state(),
      faker.address.zipCode().replace(/-\d{4}/gi, "")
    ];
    // console.log(results);
    return result.join(", ");
  }
  buildMerchant(mock, type) {
    // console.log(mocks type);
    return {
      profileType: type._id,
      name: mock.merchant,
      commission: parseInt(mock.commissionFee.replace(/(\d+)/gi, "$1")),
      logo: "http://lorempixel.com/200/200/",
      phone: mock.phone,
      address: mock.address,
      description: mock.companyDescription.replace("\r\n", "")
    };
  }
  buildCustomers(number, type) {
    const results = [];
    for (let i = 0; i < number; i += 1) {
      const doc = {
        profileType: type._id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: this.buildAddress(),
        likedProducts: [],
        orders: []
      };
      results.push(doc);
    }
    // console.log(results);
    return results;
  }
  buildUsers(...profiles) {
    const ids = profiles.reduce((acc, cur) => {
      if (Array.isArray(cur)) return acc.concat(cur);
    }, []);
    // console.log(ids);
    const users = ids.map(id => {
      const firstName = faker.name.firstName().toLowerCase();
      const lastName = faker.name.lastName().toLowerCase();
      return {
        username: firstName.substr(0, 1) + lastName,
        email: `${firstName}@${lastName}.com`,
        password: "asdfasdf",
        profile: id
      };
    });
    // console.log(users);
    return users;
  }
  insertUsers(users) {
    const promises = users.map(
      user =>
        new Promise((resolve, reject) => {
          let id;
          try {
            id = Accounts.createUser(user);
          } catch (e) {
            return reject(e);
          }
          return resolve(id);
        })
    );
    return Promise.all(promises).then(
      seeded => seeded,
      err => new Meteor.Error(err)
    );
  }
  async findCategory(name) {
    const entries = Object.entries(seedData.categories);
    // console.log("TEST".yellow, entries.length);
    const target = name
      .substr(name.indexOf(" "))
      .replace(/\s+/gi, "")
      .toLowerCase();
    // console.log("TEST".yellow, target, target.length);
    let match = "misc";
    entries.forEach(entry => {
      const [category, items] = entry;
      // console.log("TEST".yellow, category, items);
      if (items.includes(target)) {
        match = category;
      }
    });
    // console.log("TEST".yellow, target, match);
    const categoryId = await Categories.findOne({ name: match })._id;
    // console.log("TEST".yellow, categoryId);
    return categoryId;
  }
  async buildSeedProducts(data, limit = null) {
    let mocks = data;
    if (limit !== null) {
      mocks = data.splice(0, limit);
    }
    console.log("Mock Items to Seed:".yellow, mocks.length);
    const seeded = {
      merchants: [],
      users: [],
      brands: [],
      products: []
    };
    const merchantTypeId = await ProfileTypes.findOne({ name: "merchant" });

    const totalPromises = await mocks.map(async mock => {
      // check mock
      // console.log("TEST".yellow, mock);

      // build merchant profile
      const merchantProfile = this.buildMerchant(mock, merchantTypeId);
      // console.log("Merchant Profile".yellow, merchantProfile);

      // save merchant profile
      const profileId = await this.insertDoc(Merchants, merchantProfile);
      // console.log("Merchant Profile Id".yellow, profileId);
      seeded.merchants.push(profileId);

      // build user
      const builtUsers = this.buildUsers([profileId]);
      builtUsers[0].email = mock.contactEmail;
      builtUsers[0].username = mock.contactEmail.replace(
        /(\w+)@\w+\.com/gi,
        "$1"
      );
      // console.log("Built Users".yellow, builtUsers);
      const userIds = await this.insertUsers(builtUsers);
      // console.log("Seeded User Ids".yellow, userIds.length);
      const userId = userIds[0];
      seeded.users.push(userId);

      // seed brands
      const { brands } = mock;
      const builtBrands = brands.map(brand => ({ name: brand }));
      // console.log("Built Brands".yellow, builtBrands);
      const seededBrands = await this.insertDocs(Brands, builtBrands);
      // console.log("Seeded Brands".yellow, seededBrands.length);
      seeded.brands.push(seededBrands);

      // seed products
      const { products } = mock;
      // console.log("Products in Mock:".yellow, products.length);
      const productPromises = await products.map(async product => {
        const productBrand = brands[product.belongsToBrand];
        // console.log("Product Brand:".yellow, productBrand);
        const brandId = await Brands.findOne({ name: productBrand })._id;
        // console.log("Brand Id:".yellow, brandId);
        const categoryId = await this.findCategory(product.name);
        // console.log("Found Category Id:".yellow, categoryId);
        // build product with refs
        const builtProduct = {
          name: product.name,
          brand: brandId,
          category: categoryId,
          user: userId,
          published: true,
          price: product.price,
          description: product.description,
          color: product.color,
          size: product.size,
          quantity: product.quantity,
          image: `images/${seedData.productImages[
            faker.random.number({ min: 0, max: 6 })
          ]}`
        };
        // console.log("TEST".yellow, builtProduct);
        const productId = await this.insertDoc(Products, builtProduct);
        // console.log("TEST".yellow, productId);
        return productId;
      });

      // get back all product ids
      const productIds = await Promise.all(productPromises).then(
        ids => ids,
        err => Meteor.Error(err)
      );
      // console.log("Number of Products Inserted for Mock".yellow, productIds.length);
      console.log(
        "Products in Mock Matches Products Seeded:".yellow,
        products.length === productIds.length
      );
      seeded.products.push(productIds);
    });

    // total promise object
    const totals = await Promise.all(totalPromises).then(
      totals => totals,
      err => Meteor.Error(err)
    );

    // log total seeded
    // console.log("TEST".yellow, seeded);
    const lengths = {};
    Object.entries(seeded).map(entry => {
      const [category, ids] = entry;
      lengths[category] = ids.reduce((acc, cur) => acc.concat(cur)).length;
    });
    // console.log("TEST".yellow, lengths);
    return lengths;
  }
}

// export module
export default SeedHelper;
