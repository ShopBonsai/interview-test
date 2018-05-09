// import modules
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Summary from "./";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  cartItems: state.cart.items
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const SummaryContainer = connect(mapStateToProps, mapDispatchToProps)(Summary);

// export container for app
export default withRouter(SummaryContainer);
