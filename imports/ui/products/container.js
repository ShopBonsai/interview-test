// import modules
import { connect } from "react-redux";
import Products from "./index.jsx";
import { unsetProductShow, setFilter } from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  productShow: state.ui.productShow
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  unsetProductShow: () => dispatch(unsetProductShow()),
  setFilter: filter => dispatch(setFilter(filter))
});

// connects redux statefull containers to presentational components
const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Products
);

// export container for app
export default ProductsContainer;
