import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer, middleware, history } from "./redux/index.js";

import Routes from "./Routes.jsx";

const store = createStore(rootReducer, {}, middleware);
const App = () =>
  <Provider store={store}>
    <Routes history={history} />
  </Provider>;
export default App;
