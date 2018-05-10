// import modules
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Checkout from "./";
import { setTaxRate } from "../../../redux/actions/cart";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  cartItems: state.cart.items,
  products: props.products,
  profileTypes: props.profileTypes,
  customers: props.customers,
  orderStatus: props.orderStatus
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(
  Checkout
);

// export container for app
export default withRouter(CheckoutContainer);
