// import modules
import { connect } from "react-redux";
import Products from "./index";
// import { setFilter, unsetFilter } from "../../redux/actions/filter";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  productShow: state.ui.productShow
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Products
);

// export container for app
export default ProductsContainer;
