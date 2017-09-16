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
        <button onClick={this.props.onClick}
          className="help-button">Talk to Someone</button>{' '}
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
    this.initialState = {
      returnQuantity: 1
    };
    this.state = this.initialState;
  }

  setQuantity(quant) {
    this.setState(() => ({ returnQuantity: quant }));
  }

  // when apply changes is clicked, hide drawer and update return quantities
  handleChangesButton() {
    this.props.onClick();
    this.props.updateReturnQuant(this.state.returnQuantity);
  }

  render() {
    const quant = [...Array(this.props.initialQuantity).keys()];
 
    return (
      <div>
        <Button onClick={this.props.onClick}> back </Button>
        <h3> Return Quantity </h3>
        <ListGroup>
         {quant.map(quant =>
              <Button key={quant} onClick={()=>this.setQuantity(quant+1)}>{quant + 1}</Button>)}
         </ListGroup>
         <Button color="primary" onClick={this.handleChangesButton.bind(this)}>Apply Changes</Button>
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
        <section className="seller-group">
          <section className="seller-group-header">
            <h5>{this.props.seller}</h5>
           </section>
            {products.map(products =>
                  <ProductCard key={products.name} products={products} 
                  toggleDrawer={this.props.toggleDrawer}
                  updateSelectedItem={this.props.updateSelectedItem} 
                  quantities={this.props.quantities} />)}
        </section>
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

    if (this.props.quantities !== null) {
      var returnQuantity = this.props.quantities[product.name];
    } else {
      var returnQuantity = 1;
    }
    
    return (
      <div>
        <section className="product-card">
          <section className="product-card-left" />
          <section className="product-card-right">
            <div className="product-card-header">
              <p className="product-price">C${product.pricePerItem}</p>
              <p className="product-brand">{product.brand}</p>
              <p className="product-name">{product.name}</p>
            </div>
            <Card>
              <Button>Size {product.size}</Button>
              <Button>Color {product.color}</Button>
              <Button onClick={this.handleClick.bind(this)}>Return Quantity 
                {returnQuantity} of {product.quantityPurchased} ></Button>
            </Card>
          </section>
        </section>
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
      initialQuantities: null,
      returnQuantities: null,
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
        // keep initial quantities separate so the drawer can render the correct
        // number of options
        this.setState(() => ({ initialQuantities: quantities,
          returnQuantities: quantities }));
      }
    });
  }

  // when return quantities is selected for an item, that item becomes the
  // currently selected item so that the drawer knows which item to display
  updateSelectedItem(name) {
    this.setState(() => ({ selectedItem: name }));
  }

  updateReturnQuant(quant) {
    var oldQuants = this.state.returnQuantities;
    var newQuants = Object.assign({}, oldQuants);
    newQuants[this.state.selectedItem] = quant;
    this.setState(() => ({ returnQuantities: newQuants }));

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
                updateSelectedItem={this.updateSelectedItem.bind(this)} quantities={this.state.returnQuantities} />)
    }
    
    if (this.state.showHelp == 1) {
      var help = React.createElement(HelpModal, {onClick: this.toggleHelp.bind(this)});
    } else {
      var help = null;
    }

    if (this.state.showDrawer == 1) {
      var drawer = React.createElement(ReturnDrawer, 
        {onClick: this.toggleDrawer.bind(this),
          initialQuantity: this.state.initialQuantities[this.state.selectedItem],
          quantity: this.state.returnQuantities[this.state.selectedItem],
          updateReturnQuant: this.updateReturnQuant.bind(this)});
    } else {
      var drawer = null;
    }

    return (
      <Page>
        <Col sm="5">
          <main className="main">
            <section className="returns-header">
              <button className="back-button">&larr;</button>
              <Row>
                <p className="page-count">1 of 3</p>
              </Row>
              <Row>
                <h5 className="returns-header-text">How many items would you like to return?</h5>
              </Row>
            </section>
            <Row>
              <Col>
                <HelpButton onClick={() => this.toggleHelp()}
                  className="help-button" />
                {help}
              </Col>
            </Row>
            <section className="item-list">
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
            </section>
          </main>
        </Col>
      </Page>
    );
  }
}

export default ReturnsPage;
