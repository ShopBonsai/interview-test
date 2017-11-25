import { cps, put, takeEvery, all, select } from "redux-saga/effects";
import * as types from "./types";

/**
 *   SAGAS!
 */

function* fetchMerchants() {
  try {
    const merchants = yield cps(
      [Meteor, Meteor.call],
      "merchants.getMerchants"
    );
    yield put({ type: types.FETCH_MERCHANTS_SUCCESS, merchants });
  } catch (error) {
    yield put({ type: types.FETCH_MERCHANTS_FAILURE, error });
  }
}

function* addItemToCart(productId, quantity, totalPrice) {
  yield put({
    type: types.ADD_TO_CART,
    item: {
      productId,
      quantity,
      totalPrice
    }
  });
  const cart = yield select(state => state.orders.cart);
  yield apply(localStorage, localStorage.setItem, [
    "cart",
    JSON.stringify(cart)
  ]);
}

/**
 *   Saga Watchers
 */

function* watchFetchMerchants() {
  yield takeEvery(types.FETCH_MERCHANTS, fetchMerchants);
}

/**
 *   Exported Root Saga
 */

export default function* rootSaga() {
  yield all([watchFetchMerchants()]);
}