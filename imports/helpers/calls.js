// define module
const calls = {
  insertCustomer: (Meteor, profile) =>
    new Promise((resolve, reject) => {
      Meteor.call("insertCustomer", profile, (err, doc) => {
        if (err) {
          alert("Error saving customer profile.");
          return reject(err);
        }
        alert("Customer profile saved successfully " + doc);
        return resolve(doc);
      });
    }),
  insertOrder: (Meteor, order) =>
    new Promise((resolve, reject) => {
      Meteor.call("insertOrder", order, (err, doc) => {
        if (err) {
          alert("Error saving order");
          return reject(err);
        }
        alert("Order saved successfully " + doc);
        return resolve(doc);
      });
    }),
  insertUser: (Meteor, user) =>
    new Promise((resolve, reject) => {
      Meteor.call("insertUser", user, (err, doc) => {
        if (err) {
          alert("Error saving user");
          return reject(err);
        }
        alert("User saved successfully " + doc);
        return resolve(doc);
      });
    }),
  addOrderToCustomer: (customer, orderId) =>
    new Promise((resolve, reject) => {
      Meteor.call("addOrderToCustomer", customer, orderId, (err, doc) => {
        if (err) {
          alert("Error adding order to customer profile.");
          return reject(err);
        }
        alert("Order added successfully " + doc);
        return resolve(doc);
      });
    }),
  checkForAccount: (Meteor, email) =>
    new Promise((resolve, reject) => {
      Meteor.call("checkForAccount", email, (err, doc) => {
        if (err) {
          alert("Error checking for account for email: " + email);
          return reject(err);
        }
        alert("Check for account with email response: " + doc._id);
        return resolve(doc);
      });
    })
};

export default calls;
