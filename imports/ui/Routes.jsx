// Framework
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";

// Pages
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import { Meteor } from "meteor/meteor";

import {connect} from 'react-redux-meteor';

import { bindActionCreators } from 'redux'
import {getMerchants} from "./reducers/merchants";

class Routes extends React.Component {
  constructor(props){
  	super(props);
  }

  componentWillMount(){
  	this.props.getMerchants();
  }

  render(){
  	return(
	  <Router history={browserHistory}>
	    <div>
	      <Route exact path="/" component={Home} />
	      <Route path="/shop" component={Shop} />
	      <Route path="/cart" component={Cart} />
	      <Route path="/orders" component={Orders} />
	      <Route path="/Profile" component={Profile} />
	    </div>
	  </Router>
	)	
  }
} 

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMerchants
},dispatch)

export default connect( 
  null,
  null,
  mapDispatchToProps
)(Routes);
