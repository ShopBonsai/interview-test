// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col, Button, Card } from "reactstrap";
import Page from "../components/Page.jsx";

class HelpButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.props.onClick}>Talk to Someone</Button>{' '}
      </div>
      );
  }
}

class HelpModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <h1>Need a hand?</h1>
        </Row>
        <Row>
          <p>Push the call button and we'll gladly put you in touch with one of our
          knowledgeable reps.</p>
        </Row>
        <Row>
          <Button color="primary">Call Us</Button>{' '}
        </Row>
        <Row>
          <Button color="primary" onClick={this.props.onClick}>Close</Button>{' '}
        </Row>
      </div>
      );
  }
}

class SellerGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const products = this.props.products;

    return (
      <div>
        <h1>{this.props.seller}</h1>
        {products.map(products =>
              <ProductCard key={products.name} products={products} />)}
      </div>
      );
  }
}

class ProductCard extends Component {
  constructor(props) {
    super(props);
    // Initialize State
    this.initialState = {
      numReturns: 0
    };
    this.state = this.initialState;
  }

  render() {
    const product = this.props.products;

    return (
      <div>
        <Card>
          <p>C${product.pricePerItem}</p>
          <p>{product.brand}</p>
          <p>{product.name}</p>
          <p>Size {product.size}</p>
          <p>Color {product.color}</p>
          <p>Return Quantity {this.state.numReturns} of {product.quantityPurchased} ></p>
        </Card>
      </div>
      );
  }
}

class ReturnsPage extends Component {
  constructor(props) {
    super(props);
    // Initialize State
    this.initialState = {
      lastOrder: null,
      error: null,
      showHelp: false
    };
    this.state = this.initialState;
  }

  componentWillMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      }
      this.setState(() => ({ lastOrder: response }));
    });
  }

  openHelp(e) {
    this.setState(() => ({ showHelp: true }));
  }

  closeHelp(e) {
    this.setState(() => ({ showHelp: false }));
  }

  render() {
    const { lastOrder, error } = this.state;
    var SellerGroups = null;
    if (lastOrder !== null) {
      console.log(lastOrder.merchantOrders)
      const sellers = lastOrder.merchantOrders;
      SellerGroups = sellers.map(sellers =>
              <SellerGroup key={sellers.name} seller={sellers.name} products={sellers.items} />)
      console.log(SellerGroups)
    }
    
    if (this.state.showHelp) {
      var help = React.createElement(HelpModal, {onClick: this.closeHelp.bind(this)});
    } else {
      var help = null;
    }

    return (
      <Page>
        <Col sm="5">
          <Row>
            <p>1 of 3</p>
          </Row>
          <Row>
            <h4>How many items would you like to return?</h4>
          </Row>
          <Row>
            <Col>
              <HelpButton onClick={() => this.openHelp()}/>
              {help}
            </Col>
          </Row>
          <Row>
            <Col>
              {SellerGroups}
            </Col>
          </Row>
          <Row>
            <Col>
              {error}
            </Col>
          </Row>
        </Col>
      </Page>
    );
  }
}

export default ReturnsPage;
