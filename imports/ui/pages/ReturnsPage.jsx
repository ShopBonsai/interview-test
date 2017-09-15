// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col, Button, Card, ListGroup, ListGroupItem } from "reactstrap";
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
        <Card>
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
        </Card>
      </div>
      );
  }
}

class ReturnDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p onClick={this.props.onClick}> back </p>
        <h3> Return Quantity </h3>
        <ListGroup>
          <ListGroupItem>1</ListGroupItem>
          <ListGroupItem>2</ListGroupItem>
          <ListGroupItem>2</ListGroupItem>
        </ListGroup>
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
      numReturns: 0,
      showDrawer: 0
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
          <p onClick={this.toggleDrawer}>Return Quantity {this.state.numReturns} of {product.quantityPurchased} ></p>
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
      showHelp: 0,
      showDrawer: 0,
      quantities: null
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

  componentDidMount() {
    // keep track of the quantities purchased of each item
    const ord = this.state.lastOrder;
      if (ord !== null) {
        var quantities = new Array();
        for (var i in ord.merchantOrders) {
          for (var j in ord.merchantOrders[i].items) {
            quantities.push(ord.merchantOrders[i].items[j].quantityPurchased)
          }
        }
        this.setState(() => ({ quantities: quantities }));
      }
  }

  toggleHelp() {
    var toggle = 0;
    if (this.state.showHelp == 0) {
      toggle = 1;
    }
    this.setState(() => ({ showHelp: toggle }))
  }

  toggleDrawer() {
    var toggle = 0;
    if (this.state.showDrawer == 0) {
      toggle = 1;
    }
    this.setState(() => ({ showDrawer: toggle }))
  }

  render() {
    const { lastOrder, error } = this.state;

    var SellerGroups = null;
    if (lastOrder !== null) {
      const sellers = lastOrder.merchantOrders;
      SellerGroups = sellers.map(sellers =>
              <SellerGroup key={sellers.name} seller={sellers.name} products={sellers.items} />)
    }
    
    if (this.state.showHelp == 1) {
      var help = React.createElement(HelpModal, {onClick: this.toggleHelp.bind(this)});
    } else {
      var help = null;
    }

    if (this.state.showDrawer == 1) {
      var drawer = React.createElement(ReturnDrawer, {onClick: this.toggleDrawer.bind(this)});
    } else {
      var drawer = null;
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
              <HelpButton onClick={() => this.toggleHelp()}/>
              {help}
            </Col>
          </Row>
          <Row>
            {drawer}
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
