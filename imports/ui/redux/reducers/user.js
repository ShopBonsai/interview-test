// Import UID to make unique id
import uid from 'uid';

// Create default state for USER
const defaultState = {
  id: uid(10) 
}

// Reducer that define our user
export default function userReducer(state = defaultState, {type, payload}) {
  return state;
}