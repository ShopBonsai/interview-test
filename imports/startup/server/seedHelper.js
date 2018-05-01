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
}

// export module
export default SeedHelper;
