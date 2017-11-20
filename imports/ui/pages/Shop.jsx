// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux"

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

// State Selector
import { stateSelector } from "../reducer/products"

// Action
import { getProducts } from "../actions/productActions"

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getProducts()
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { products } = this.props;
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.data.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  products: stateSelector(state)
})

export default connect(mapStateToProps, { getProducts })(Shop);
