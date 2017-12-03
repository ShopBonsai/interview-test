import { call } from "../../meteorHelper";

export const ADD_MERCHANTS = "ADD_MERCHANTS";

/**
 * Get merchants and set it to the store
 */
export const getMerchants = () => dispatch => {
  return call("merchants.getMerchants").then(results => {
    dispatch(setMerchants(results));
  });
};

const setMerchants = merchants => {
  return {
    type: ADD_MERCHANTS,
    payload: merchants
  };
};
