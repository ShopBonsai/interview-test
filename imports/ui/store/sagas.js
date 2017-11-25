import {
  cps,
  put,
  takeEvery,
  all,
  select,
  apply,
  takeLatest
} from "redux-saga/effects";
import { Base64 } from "js-base64";
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

function* addItemToCart({ type, ...item }) {
  try {
    yield put({
      type: types.ADD_TO_CART,
      item
    });
    const cart = yield select(state => state.orders.cart);
    localStorage.setItem("cart", Base64.encode(JSON.stringify(cart)));
  } catch (e) {
    yield put({ type: types.SAVE_TO_CART_ERROR });
  }
}

function* loadCartToStore() {
  try {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(Base64.decode(cart));
    yield put({ type: types.LOAD_CART, cart });
  } catch (e) {
    yield put({ type: types.LOAD_CART_ERROR });
  }
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
