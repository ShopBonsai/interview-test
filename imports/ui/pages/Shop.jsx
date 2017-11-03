// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import { connect } from "react-redux";
import { setUser, clearUser } from "../store/actions";
import { setProducts } from "../store/actions/index";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      visits: 0,
      brand: null,
      prod: null,
      merc: null,
      pageView: 0
    };
  }

  componentWillMount() {
    let self = this;
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        // this.setState(() => ({ merchants: response }));

        const getProductsFromMerchant = ({ products, brands, merchant }) =>
          products.map(({ belongsToBrand, ...product }) => ({
            ...product,
            brand: brands[belongsToBrand],
            merchant
          }));

        const products = response.reduce(
          (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
          []
        );
        // this.setState(() => ({ products: products }));
        self.props.productActions.setProd(products);
      }
    });
    let userName = this.props.user.profile
      ? this.props.user.profile.name
      : "anon";
    Meteor.call("visits.logVisit", "Shop", userName, (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response);
      }
    });

    Meteor.call("visits.getPageCount", "Shop", (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        this.setState(() => ({ pageView: response }));
      }
    });
  }

  goBack = () => this.props.history.push("/");

  change = (event, type) => {
    this.setState({
      [type]: event.target.value === "null" ? null : event.target.value
    });
  };

  render() {
    let self = this;
    // const { merchants, error } = this.state;
    //
    // const getProductsFromMerchant = ({ products, brands, merchant }) =>
    //   products.map(({ belongsToBrand, ...product }) => ({
    //     ...product,
    //     brand: brands[belongsToBrand],
    //     merchant
    //   }));
    //
    // const products = merchants.reduce(
    //   (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
    //   []
    // );

    let products = [].concat(this.props.products);
    // console.log(this.state.brand, this.state.prod, this.state.merc);
    if (this.state.brand) {
      products = products.filter(function(prod) {
        return prod.brand === self.state.brand;
      });
    }
    if (this.state.prod) {
      products = products.filter(function(prod) {
        return prod.name === self.state.prod;
      });
    }
    if (this.state.merc) {
      products = products.filter(function(prod) {
        return prod.merchant === self.state.merc;
      });
    }

    // console.log(products);

    return (
      <Page
        pageTitle="shop"
        history
        goBack={this.goBack}
        userActions={this.props.userActions}
        pView={this.state.pageView}
      >
        {this.props.products.length < 1 &&
          <div className="spinner-box">
            <div className="spinner" />
          </div>}
        {this.props.products.length > 0 &&
          <div className="filter-panel">
            <div>
              <span>Brand</span>
              <select
                onChange={e => {
                  this.change(e, "brand");
                }}
              >
                <option key="-1" value="null">
                  ALL
                </option>
                {[
                  ...new Set(
                    this.props.products.map(prod => {
                      return prod.brand;
                    })
                  )
                ].map((brand, i) =>
                  <option key={i} value={brand}>
                    {brand}
                  </option>
                )}
              </select>
            </div>
            <div>
              <span>Product</span>
              <select
                onChange={e => {
                  this.change(e, "prod");
                }}
              >
                <option key="-1" value="null">
                  ALL
                </option>
                {[
                  ...new Set(
                    this.props.products.map(prod => {
                      return prod.name;
                    })
                  )
                ].map((name, i) =>
                  <option key={i} value={name}>
                    {name}
                  </option>
                )}
              </select>
            </div>
            <div>
              <span>Merchant</span>
              <select
                onChange={e => {
                  this.change(e, "merc");
                }}
              >
                <option key="-1" value="null">
                  ALL
                </option>
                {[
                  ...new Set(
                    this.props.products.map(prod => {
                      return prod.merchant;
                    })
                  )
                ].map((merc, i) =>
                  <option key={i} value={merc}>
                    {merc}
                  </option>
                )}
              </select>
            </div>
          </div>}
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    products: state.currentProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userActions: {
      onLogin: user => dispatch(setUser(user)),
      onClear: () => dispatch(clearUser())
    },
    productActions: {
      setProd: prods => dispatch(setProducts(prods))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
