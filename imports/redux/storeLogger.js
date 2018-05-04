// define storelogger function
const storeLogger = store => next => action => {
  console.log("Action: ", action);
  setTimeout(() => {
    console.log("New State: ", store.getState());
  }, 1);
  const result = next(action);
  return result;
};

// export function
export default storeLogger;
