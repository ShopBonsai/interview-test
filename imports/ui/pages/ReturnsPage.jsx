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
    const quant = [...Array(this.props.quantity).keys()];
    console.log(quant)
 
    return (
      <div>
        <Button onClick={this.props.onClick}> back </Button>
        <h3> Return Quantity </h3>
        <ListGroup>
         {quant.map(quant =>
              <Button key={quant}>{quant + 1}</Button>)}
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
        <h5>{this.props.seller}</h5>
        {products.map(products =>
              <ProductCard key={products.name} products={products} 
              toggleDrawer={this.props.toggleDrawer}
              updateSelectedItem={this.props.updateSelectedItem} />)}
      </div>
      );
  }
}

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.toggleDrawer();
    this.props.updateSelectedItem(this.props.products.name);
  }

  render() {
    const product = this.props.products;
    
    return (
      <div>
        <Card>
          <p>C${product.pricePerItem}</p>
          <p>{product.brand}</p>
          <p>{product.name}</p>
          <Button>Size {product.size}</Button>
          <Button>Color {product.color}</Button>
          <Button onClick={this.handleClick.bind(this)}>Return Quantity 
            0 of {product.quantityPurchased} ></Button>
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
      quantities: null,
      selectedItem: null
    };
    this.state = this.initialState;
  }

  componentWillMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      }
      this.setState(() => ({ lastOrder: response }));

      // Set up initial quantity purchased for each item
      if (response) {
        var quantities = {};
        for (var i in response.merchantOrders) {
          for (var j in response.merchantOrders[i].items) {
            var name = response.merchantOrders[i].items[j].name;
            quantities[name] = response.merchantOrders[i].items[j].quantityPurchased;
          }
        }
        this.setState(() => ({ quantities: quantities }));
      }
    });
  }

  updateSelectedItem(name) {
    this.setState(() => ({ selectedItem: name }));
  }

  updateReturnQuant(index, num) {
    var oldQuant = this.state.quantities;
    var newQuant = oldQuant.slice();
    newQuant[index] = num;
    this.setState(() => ({ quantities: newQuant }));
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
              <SellerGroup key={sellers.name} seller={sellers.name}
                products={sellers.items} toggleDrawer={this.toggleDrawer.bind(this)}
                updateSelectedItem={this.updateSelectedItem.bind(this)} />)
    }
    
    if (this.state.showHelp == 1) {
      var help = React.createElement(HelpModal, {onClick: this.toggleHelp.bind(this)});
    } else {
      var help = null;
    }

    if (this.state.showDrawer == 1) {
      var drawer = React.createElement(ReturnDrawer, {onClick: this.toggleDrawer.bind(this), quantity: this.state.quantities[this.state.selectedItem]});
    } else {
      var drawer = null;
    }

    return (
      <Page>
        <Col sm="6">
          <Row>
            <p>1 of 3</p>
          </Row>
          <Row>
            <h5>How many items would you like to return?</h5>
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
