import { call, put } from "redux-saga/effects";

export function* fetchMerchants() {
  try {
    const merchants = yield call(Meteor.call("merchants.getMerchants"));
    yield put({
      type: "FETCH_MERCHANTS_SUCCESS",
      merchants
    });
  } catch (error) {
    yield put({
      type: "FETCH_MERCHANTS_FAILURE",
      error
    });
  }
}
