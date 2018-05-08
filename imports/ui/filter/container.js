// import modules
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Filter from "./";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";
import { setFilter, unsetFilter } from "../../redux/actions/ui";
import helpers from "../../helpers";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  filterResults: state.ui.filterResults,
  filterValues: helpers.getFilterResultsValues(
    state.ui.filterResults,
    props.merchants,
    props.users
  ),
  productsCount: props.products.length
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  unsetFilter: () => dispatch(unsetFilter())
});

// connects redux statefull containers to presentational components
const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

// export container for app
export default withTracker(() => {
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    users: Meteor.users.find().fetch(),
    merchants: Merchants.find().fetch(),
    products: Products.find().fetch()
  };
})(FilterContainer);
