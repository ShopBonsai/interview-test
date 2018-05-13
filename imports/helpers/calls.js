// import modules
import { showModal } from "../redux/actions/ui";

// define module
const calls = {
  insertCustomer: (Meteor, profile) =>
    new Promise((resolve, reject) => {
      Meteor.call("insertCustomer", profile, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    }),
  insertOrder: (Meteor, order) =>
    new Promise((resolve, reject) => {
      Meteor.call("insertOrder", order, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    }),
  addOrderToCustomer: (customer, orderId) =>
    new Promise((resolve, reject) => {
      Meteor.call("addOrderToCustomer", customer, orderId, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    }),
  checkForAccount: (Meteor, email) =>
    new Promise((resolve, reject) => {
      Meteor.call("checkForAccount", email, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    }),
  insertUser: (Meteor, user) =>
    new Promise((resolve, reject) => {
      Meteor.call("insertUser", user, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    }),
  dropQuantities: (Meteor, orderProducts) =>
    new Promise((resolve, reject) => {
      Meteor.call("dropQuantities", orderProducts, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  updateStatus: (orderId, newStatus, tracking) =>
    new Promise((resolve, reject) => {
      Meteor.call(
        "updateStatus",
        orderId,
        newStatus,
        tracking,
        (err, result) => {
          if (err) return reject(err);
          return reject("test");
          // return resolve(result);
        }
      );
    }),
  updatePublished: (id, newStatus) =>
    new Promise((resolve, reject) => {
      Meteor.call("updatePublished", id, newStatus, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    })
};

export default calls;
