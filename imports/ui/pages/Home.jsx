// Framework
import React, { Component } from "react";

// Components
import Page from "../components/Page.jsx";
import {Button} from "reactstrap";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const userId = this.props.userId;
    return (
      <Page headerHidden={true}>
        <div className="home-page">
          <h2 className="title">Welcome to our humble Shop</h2>     
          {
            userId ? 
            <div>
              <Button block onClick={() => {this.props.history.push("/shop");}}>Go shopping</Button>
              <Button  block onClick={() => {this.props.history.push("/orders");}}>Orders</Button>
              <Button  block onClick={() => {this.props.history.push("/profile");}}>Profile</Button>
            </div> :
            <div>
              <Button block onClick={() => {this.props.history.push("/shop");}}>Go shopping</Button>
              <Button block onClick={() => {this.props.history.push("/login");}}>Login</Button>
              <Button block onClick={() => {this.props.history.push("/register");}}>Register</Button>
            </div>
          }
        </div>
      </Page>
    );
  }
}

mapStateToProps = (state) => ({
 userId: state.auth.userId
})

mapDispatchToProps = (dispatch) => bindActionCreators({

},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Home);
