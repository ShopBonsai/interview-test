// import modules
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Items from "./";
import Brands from "../../../api/brands/collection";
import Merchants from "../../../api/merchants/collection";
import Products from "../../../api/products/collection";
import { updateCartItem } from "../../../redux/actions/cart";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  brands: props.brands,
  cartItems: state.cart.items,
  merchants: props.merchants,
  products: props.products,
  users: props.users
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  updateCartItem: item => dispatch(updateCartItem(item))
});

// connects redux statefull containers to presentational components
const ItemsContainer = connect(mapStateToProps, mapDispatchToProps)(Items);

// export container for app
export default withTracker(() => {
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    brands: Brands.find().fetch(),
    users: Meteor.users.find().fetch(),
    merchants: Merchants.find().fetch(),
    products: Products.find().fetch()
  };
})(ItemsContainer);
