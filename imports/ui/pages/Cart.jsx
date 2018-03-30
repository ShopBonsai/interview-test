// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

//Component
import Page from "../components/Page.jsx";

class Cart extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    orderedItems: []
	  }
	}
    
  goBack = () => this.props.history.push("/shop");

  logout = (e) => {
    e.preventDefault();
    Meteor.logout((er) => {
      if(er){
        M.toast({html: er.reason, classes: 'rounded red', displayLength: '2000'});
      } else {
        M.toast({html: "Logout Successfully!", classes: 'rounded green', displayLength: '2000'});
        this.props.history.push("/shop");
      }
    })

  }
  
  render() {
    return(
      <Page pageTitle="My Cart" history goBack={this.goBack} logout={this.logout}>
        <div className="shop-page">
          <h3>All the products I bought should be here</h3>	
        </div>
      </Page>
    );
  }

}

export default Cart;