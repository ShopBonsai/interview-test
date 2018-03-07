// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page";
import Product from "../components/Product";
import Cart from '../components/Cart';
import Toaster from '../components/Toaster';


/*
  This is the shop component where the products 
  is loaded from server, as well as 
  store the items in order.  
*/ 

class Shop extends Component {
    constructor(props) {
      super(props);
      this.state = {
        merchants: [],
        error: null,
        orderItems: [],
        numItems : 0,
        fade : false,
        isError : false,
        message : ""
      };
    }
    
    raiseErrorToaster = () => {
      this.setState(() => ({ isError : !this.state.isError }));  
    }

    setErrorMessage = (message) => {
      this.setState(() =>({message : message}));
    } 

    /* 
      this function add each product and 
      its respective quantity in the 
      orderItems state attribute 
    */
    addItem = (product,quantity) => {
    const items = this.state.orderItems;
    const item = {
        product : product,
        quantity : quantity
    }
    items.push(item);
    this.setState(() => ({ orderItems: items, numItems : items.length }));
    console.log(this.state.orderItems)
    }

    /*  this function makes the fade 
        effect on Cart Component */ 
    toggleFade = () => {
      this.setState(() => ({fade: !this.state.fade}));
      console.log(this.state.fade)    
    }
    
    /*
      this function renders the Cart component 
      when the toggle button is clicked
    */ 
    renderCart = () => {  
        const {fade, numItems} = this.state;
        if(fade && numItems > 0 ){
          /* the items are passed as props in the cart component */ 
          return (
            <div> 
                <Cart items={this.state.orderItems} 
                      clearItems={this.clearNumItems}
                      raise={() => this.raiseErrorToaster()}
                      setMessage={this.setErrorMessage} />
            </div>
          )
        }else{
          return null;
        }
    }

    clearNumItems = () => {
      this.setState(() => ({numItems : 0,orderItems: [], fade: false}));
    }

    componentWillMount() {
      Meteor.call("merchants.getMerchants", (error, response) => {
        if (error) {
          this.setState(() => ({ error: error }));
        } else {
          this.setState(() => ({ merchants: response }));
        }
      });
    }

    goBack = () => this.props.history.push("/");

    render() {
      const { merchants, error, numItems } = this.state;

      const getProductsFromMerchant = ({ products, brands }) =>
        products.map(({ belongsToBrand, ...product }) => ({
          ...product,
          brand: brands[belongsToBrand]
        }));

      const products = merchants.reduce(
        (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
        []
      );

      return (
        <Page pageTitle="shop" history goBack={this.goBack} item={numItems} toggleFade={this.toggleFade} >
          <div className="shop-page">
            {this.renderCart()}
            {products.map(({ id, ...product }) =>
              // the addItem is passes as props in the Product component
              <Product {...product} key={id} addItem={this.addItem} />
            )}
          </div>
          <Toaster open={this.state.isError} message={this.state.message}
                   raise={() => this.raiseErrorToaster()}/>
        </Page>
      );
    }
}

export default Shop;
