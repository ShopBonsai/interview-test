// import modules
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderScreen from "./";
import { setTaxRate } from "../../../redux/actions/cart";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const OrderScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  OrderScreen
);

// export container for app
export default withRouter(OrderScreenContainer);
