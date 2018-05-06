import Immutable from "immutable";
import { combineEpics } from "redux-observable";
import { push } from "react-router-redux";
import { map } from "rxjs/operators";

// Records
let Record = Immutable.Record({
  merchantGuid: null,
  productId: null,
  name: "Default Product Name",
  image: null,
  brand: null,
  color: null,
  description: null,
  price: null,
  productSize: null,
  amount: null,
  trackingNumber: null
});

const initialState = new Record();

// Actions
const UPDATE_ORDER = "bonsai/orders/UPDATE_ORDER";

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_ORDER:
      return state.merge({
        merchantGuid: action.merchantGuid,
        productId: action.productId,
        name: action.name,
        image: action.image,
        brand: action.brand,
        color: action.color,
        description: action.description,
        price: action.price,
        productSize: action.productSize,
        amount: action.amount,
        trackingNumber: action.trackingNumber
      });
    default:
      return state;
  }
}

export function updateOrder({
  merchantGuid,
  productId,
  name,
  image,
  brand,
  color,
  description,
  price,
  productSize,
  amount,
  trackingNumber
}) {
  return {
    type: UPDATE_ORDER,
    merchantGuid,
    productId,
    name,
    image,
    brand,
    color,
    description,
    price,
    productSize,
    amount,
    trackingNumber
  };
}

// Epic
const updateOrderEpic = (action$, store) => {
  return action$.ofType(UPDATE_ORDER).pipe(
    map(action => {
      // return action;
      // console.log(push);
      return push("/shop/thank-you");
    })
  );
};

export const ordersEpic = combineEpics(updateOrderEpic);
