// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import ThankYou from "../components/ThankYou.jsx";

const mapStateToProps = state => {
  return {
    order: {
      merchantGuid: state.orders.merchantGuid,
      productId: state.orders.productId,
      name: state.orders.name,
      image: state.orders.image,
      brand: state.orders.brand,
      color: state.orders.color,
      description: state.orders.description,
      price: state.orders.price,
      productSize: state.orders.productSize,
      amount: state.orders.amount,
      trackingNumber: state.orders.trackingNumber
    }
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class ThankYouContainer extends Component {
  componentWillMount() {
    if (!this.props.order.productId) {
      return this.props.history.push("/shop");
    }
  }
  render() {
    if (!this.props.order.productId) {
      return <div />;
    }
    return (
      <ThankYou
        order={this.props.order}
        close={() => this.props.history.push("/shop")}
      />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThankYouContainer);
