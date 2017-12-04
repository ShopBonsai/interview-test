import { SET_USER } from "../actions/user";

// Create default state for USER
const defaultState = {};

export default function userReducer(state = defaultState, { type, payload }) {
  switch (type) {
    // Set current user
    case SET_USER: {
      return payload;
    }
    default:
      return state;
  }
}
