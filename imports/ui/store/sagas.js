import {
  cps,
  put,
  takeEvery,
  all,
  select,
  apply,
  takeLatest
} from "redux-saga/effects";
import base64url from "base64url";
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

function* addItemToCart({ productId, quantity, totalPrice }) {
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
    base64url(JSON.stringify(cart))
  ]);
}

function* loadCartToStore() {
  let cart = yield apply(localStorage, localStorage.getItem, ["cart"]);
  cart = JSON.parse(base64url.decode(cart));
  yield put({ type: types.LOAD_CART, cart });
}

/**
 *   Saga Watchers
 */

function* watchFetchMerchants() {
  yield takeEvery(types.FETCH_MERCHANTS, fetchMerchants);
  yield takeEvery(types.SAVE_TO_CART, addItemToCart);
  yield takeLatest(types.START_LOAD_CART, loadCartToStore);
}

/**
 *   Exported Root Saga
 */

export default function* rootSaga() {
  yield all([watchFetchMerchants()]);
}