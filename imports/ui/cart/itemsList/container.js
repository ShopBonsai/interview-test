// import modules
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemsList from "./";
import { updateCartItem, deleteItem } from "../../../redux/actions/cart";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  cartItems: state.cart.items
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  updateCartItem: item => dispatch(updateCartItem(item)),
  deleteItem: id => dispatch(deleteItem(id))
});

// connects redux statefull containers to presentational components
const ItemsListContainer = connect(mapStateToProps, mapDispatchToProps)(
  ItemsList
);

// export container for app
export default withRouter(ItemsListContainer);
