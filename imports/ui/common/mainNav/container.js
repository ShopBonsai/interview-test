// import modules
import { connect } from "react-redux";
import MainNav from "./";
import helpers from "../../../helpers";
import { unsetProductShow, unsetFilter } from "../../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  cartItemsLength: helpers.getTotalCartItems(state.cart.items)
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  unsetProductShow: () => dispatch(unsetProductShow()),
  unsetFilter: () => dispatch(unsetFilter())
});

// connects redux statefull containers to presentational components
const MainNavContainer = connect(mapStateToProps, mapDispatchToProps)(MainNav);

// export container for app
export default MainNavContainer;
