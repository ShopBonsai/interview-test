// Framework
import React, { Component } from "react";
import { connect } from "react-redux";

// Redux actions
import * as actions from "../actions";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page";
import Product from "../components/Product";
import Menu from "../components/Menu";
import Cart from "../components/Cart";

class Shop extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  goBack() {
    this.props.history.push("/");
  }

  render() {
    const { products } = this.props;

    let content;
    if (products.shown.length > 0) {
      content = products.shown.map(product =>
        <Product product={product} key={product.id} />
      );
    } else if (products.allArr.length > 0) {
      content = (
        <div className="center">
          No products available that match the criteria
        </div>
      );
    } else {
      content = <div className="loader" />;
    }

    return (
      <Page pageTitle="shop" history goBack={this.goBack.bind(this)}>
        <div className="shop-page">
          <Menu filters={products.filters} />
          <Cart />
          {content}
        </div>
      </Page>
    );
  }
}

function mapStateToProps({ products }) {
  return { products };
}

export default connect(mapStateToProps, actions)(Shop);
