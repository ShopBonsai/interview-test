import { ADD_MERCHANTS } from "../actions/merchants";

const defaultState = [];

export default function merchantsReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case ADD_MERCHANTS: {
      return payload;
    }
    default:
      return state;
  }
}
