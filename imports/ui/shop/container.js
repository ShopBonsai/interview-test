// import modules
import { connect } from "react-redux";
import Shop from "./";
import { unsetProductShow, setFilter } from "../../redux/actions/ui";
import { addToCart } from "../../redux/actions/cart";
import { showModal } from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  productShow: state.ui.productShow
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  unsetProductShow: () => dispatch(unsetProductShow()),
  setFilter: filter => dispatch(setFilter(filter)),
  addToCart: item => dispatch(addToCart(item)),
  showModal: (kind, message) => dispatch(showModal(kind, message))
});

// connects redux statefull containers to presentational components
const ShopContainer = connect(mapStateToProps, mapDispatchToProps)(Shop);

// export container for app
export default ShopContainer;
