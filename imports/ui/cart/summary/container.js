// import modules
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SummaryComp from "./comp";
import { setTaxRate } from "../../../redux/actions/cart";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  cartItems: state.cart.items,
  products: props.products,
  toggleCheckout: props.toggleCheckout,
  checkoutVisible: props.checkoutVisible
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const SummaryContainer = connect(mapStateToProps, mapDispatchToProps)(
  SummaryComp
);

// export container for app
export default withRouter(SummaryContainer);
