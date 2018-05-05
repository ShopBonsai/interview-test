// import modules
import factory from "./factory";
import defaultState from "./defaultState.json";

// create store for holding state
const store = factory(defaultState, "logger");

// save state to localStorage
const saveToLocalStorage = () => {
  const state = JSON.stringify(store.getState());
  window.localStorage.store = state;
};

// add store to window
window.store = store;

// set unsubscriber for subscriber
store.subscribe(saveToLocalStorage);

// export modules
export default store;
