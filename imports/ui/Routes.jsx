// Framework
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'

// Pages
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

const Routes = () =>
<Provider store={store}>
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
    </div>
  </Router>
</Provider>;

export default Routes;
