import { apply, put, takeEvery } from "redux-saga/effects";
import * as types from "./types";

function* fetchMerchants() {
  try {
    const merchants = yield apply(Meteor, call, "merchants.getMerchants");
    yield put({ type: types.FETCH_MERCHANTS_SUCCESS, merchants });
  } catch (error) {
    yield put({ type: types.FETCH_MERCHANTS_FAILURE, error });
  }
}

function* watchFetchMerchants() {
  yield takeEvery(types.FETCH_MERCHANTS, fetchMerchants);
}

export default function* rootSaga() {
  yield all([watchFetchMerchants()]);
}
