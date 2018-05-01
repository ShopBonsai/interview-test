// import modules
import { Accounts } from "meteor/accounts-base";
import faker from "faker";

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
    return Promise.all(promises).then(seeded => seeded,
      err => new Meteor.Error(err));
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
  buildMerchants(mocks, type) {
    // console.log(mocks[0], type);
    return mocks.splice(0, 3).map(merchant => ({
      profileType: type._id,
      name: merchant.merchant,
      commission: parseInt(merchant.commissionFee.replace(/(\d+)/gi, "$1")),
      logo: "http://lorempixel.com/200/200/",
      phone: merchant.phone,
      address: merchant.address,
      description: merchant.companyDescription.replace("\r\n", "")
    }));
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
        emails: [
          { address: `${firstName}@${lastName}.com`, verified: false },
        ],
        password: "asdfasdf",
        profile: id,
      };
    });
    // console.log(users);
    return users;
  }
  insertUsers(users) {
    const promises = users.map(user =>
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
    return Promise.all(promises).then(seeded => seeded,
      err => new Meteor.Error(err));
  }
}

// export module
export default SeedHelper;
