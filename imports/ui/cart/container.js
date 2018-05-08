// import modules
import { connect } from "react-redux";
import Cart from "./";
// import { unsetProductShow, setFilter } from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

// export container for app
export default CartContainer;
