// import modules
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Checkout from "./";
import { resetCart } from "../../../redux/actions/cart";
import { resetUi } from "../../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  orderStatus: props.orderStatus,
  profileTypes: props.profileTypes,
  products: props.products,
  cartItems: state.cart.items
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  resetCart: () => dispatch(resetCart()),
  resetUi: () => dispatch(resetUi())
});

// connects redux statefull containers to presentational components
const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(
  Checkout
);

// export container for app
export default withRouter(CheckoutContainer);
