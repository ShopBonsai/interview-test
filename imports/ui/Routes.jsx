// Framework
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch,
  Redirect
} from "react-router-dom";

// Pages
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";


import { Meteor } from "meteor/meteor";
import { connect } from 'react-redux-meteor';

import { bindActionCreators } from 'redux'
import { getMerchants } from "./reducers/merchants";
import { setUser, unsetUser } from "./reducers/auth";


class Routes extends React.Component {
  constructor(props){
  	super(props);
  }

  componentWillMount(){
  	this.props.getMerchants();
  }

  render(){
  	const {user} = this.props;

  	return(
	  <Router history={browserHistory}>
	      {user._id ? 
	      <Switch>
	      	<Route path="/shop" component={Shop} />
	      	<Route path="/cart" component={Cart} />
	      	<Route path="/orders" component={Orders} />
	      	<Route path="/profile" component={Profile} />
	      	<Route exact path="/" component={Home} />
	      	<Redirect to="/"/>
	      </Switch>
	      :
	      <Switch>
	      	<Route path="/shop" component={Shop} />
	      	<Route path="/cart" component={Cart} />
	      	<Route path="/login" component={Login} />
	      	<Route path="/register" component={Register} />
	      	<Route exact path="/" component={Home} />
	      	<Redirect to="/"/>
	      </Switch>
	  	  }
	  </Router>
	)	
  }
} 

const mapStateToProps = (state) => ({
	user:state.auth.user
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMerchants,
},dispatch)

export default connect( 
  null,
  mapStateToProps,
  mapDispatchToProps
)(Routes);
