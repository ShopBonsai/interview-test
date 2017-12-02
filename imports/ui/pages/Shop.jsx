// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Form, FormGroup, Label, Input } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

const ALL_SIZES_VALUE = 'all';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      products: [],
      error: null
    };
  }
  
  _allProducts = [];
  sizes = new Set();

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this._allProducts = response.reduce((acc, merchant) => [...acc, ...this.getProductsFromMerchant(merchant)], []);
        this._allProducts.forEach(product => this.sizes.add(product.size));

        this.setState(() => ({
            merchants: response,
            products: [...this._allProducts]
          })
        );
      }
    });
  }

  goBack = () => this.props.history.push("/");

  getProductsFromMerchant = ({ products, brands }) =>
    products.map(({ belongsToBrand, ...product }) => ({
      ...product,
      brand: brands[belongsToBrand]
    }));

  handleFilterSizeChange = ({target}) => {
    const value = target.value;

    if (value !== ALL_SIZES_VALUE) {
      // filter products by selected size
      this.setState({
        products: this._allProducts.filter(product => product.size === value)
      });
    } else {
      // show all products
      this.setState({ products: [...this._allProducts] });
    }
  }

  render() {
    const { merchants, products, error } = this.state;

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {this.sizes.size > 0 &&
            <div className="filters">
              <h2 className="filters-title">Filters</h2>
                <Form className="filters-form" inline>
                  <Label for="sizesSelect">Select your size:&nbsp;</Label>

                  <Input type="select" name="select" id="sizesSelect" onChange={this.handleFilterSizeChange}>
                    <option value={ALL_SIZES_VALUE}>All</option>
                    {Array.from(this.sizes).map(size =>
                      <option value={size} key={size}>{size}</option>
                    )}
                  </Input>

                </Form>
            </div>
          }

          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
