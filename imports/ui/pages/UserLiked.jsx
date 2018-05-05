import React, { Component } from "react";
import PropTypes from "prop-types";

class UserLikedProducts extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <div />;
  }
}

export default withTracker(() => {
  Meteor.subscribe("likedProducts"); // NEW!
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    likedProducts: LikedProducts.find({}).fetch()
  };
})(UserLikedProducts);
