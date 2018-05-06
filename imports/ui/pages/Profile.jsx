import React, { Component } from "react";
import PropTypes from "prop-types";

import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedProducts: [],
      error: null
    };
  }
  static propTypes = {
    likedProducts: PropTypes.array,
    error: PropTypes.object
  };

  componentWillMount() {
    Meteor.call("likedProducts.getLikedProducts", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({
          likedProducts: response
        }));
      }
    });
  }

  goBack = () => this.props.history.goBack();

  render() {
    const { likedProducts, error } = this.state;
    const { image } = this.props;
    return (
      <Page pageTitle="profile" goBack={this.goBack}>
        <div className="shop-page">
          {likedProducts.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Profile;
