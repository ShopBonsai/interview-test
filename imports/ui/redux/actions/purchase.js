import { call } from "../../meteorHelper";

export const BUY_PRODUCT = "BUY_PRODUCT";

export const buyProduct = product => (dispatch, getState) => {
  // Get USER
  const { user } = getState();
  // Create purchase object
  const purchase = { userID: user.id, product };
  // Add purchase to the DB
  return call("purchases.createPurchase", purchase)
    .then(result => {
      // Add purchase to the Store
      dispatch(addPurchase(purchase));
      return purchase;
    })
    .catch(error => {
      alert(error);
    });
};

/**
 * Action to add purchase in the store
 * @param {Object} purchase 
 */
const addPurchase = purchase => {
  return {
    payload: purchase,
    type: BUY_PRODUCT
  };
};
