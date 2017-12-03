// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { TextField, CircularProgress } from "material-ui";
import { connect } from "react-redux";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { merchant: "", brand: "", productName: "" },
      merchants: [],
      error: null,
      loading: false
    };
  }

  handleFiltersChange = (key, event) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        [key]: event.target.value
      }
    });

    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this._fetchMerchants();
    }, 500);
  };

  _fetchMerchants = () => {
    const { filters } = this.state;
    this.setState({ loading: true });
    Meteor.call("merchants.getMerchants", filters, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error, loading: false }));
      } else {
        this.setState(() => ({ merchants: response, loading: false }));
      }
    });
  };

  componentWillMount() {
    this._fetchMerchants();
  }

  goBack = () => this.props.history.goBack();

  render() {
    const { filters, merchants, loading } = this.state;

    const getProductsFromMerchant = ({ products, brands, merchant }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        merchant,
        brand: brands[belongsToBrand]
      }));

    const products = merchants
      .reduce(
        (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
        []
      )
      .filter(item =>
        item.brand.toLowerCase().includes(filters.brand.toLowerCase())
      )
      .filter(item =>
        item.name.toLowerCase().includes(filters.productName.toLowerCase())
      );

    return (
      <Page pageTitle="Shop" history goBack={this.goBack}>
        <div className="shop-page">
          <div className="search-bar">
            <label>Filter by:</label>&emsp;
            <TextField
              label="Merchant"
              value={filters.merchant}
              onChange={this.handleFiltersChange.bind(this, "merchant")}
            />&emsp;
            <TextField
              label="Brand"
              value={filters.brand}
              onChange={this.handleFiltersChange.bind(this, "brand")}
            />&emsp;
            <TextField
              label="Product Name"
              value={filters.productName}
              onChange={this.handleFiltersChange.bind(this, "productName")}
            />
          </div>
          {products.map(({ id, ...product }) =>
            <Product id={id} {...product} key={id} />
          )}
          {loading
            ? <div style={{ textAlign: "center", padding: "2rem" }}>
                <CircularProgress />
              </div>
            : null}
        </div>
      </Page>
    );
  }
}

export default connect(state => state)(Shop);
