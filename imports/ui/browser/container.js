// import modules
import { connect } from "react-redux";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Browser from "./";
import helpers from "../../helpers";
import Sorter from "../../sorter";
import Brands from "../../api/brands/collection";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";
import {
  setFilter,
  unsetFilter,
  setProductShow,
  setFilterIds,
  setFiltered
} from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  filter: state.ui.filter,
  currentSort: state.ui.currentSort,
  filterResults: state.ui.filterResults,
  brands: props.brands,
  merchants: props.merchants,
  byName: props.byName,
  lowHigh: props.lowHigh,
  highLow: props.highLow,
  users: props.users
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  unsetFilter: () => dispatch(unsetFilter()),
  setProductShow: id => dispatch(setProductShow(id)),
  setFilterIds: values => dispatch(setFilterIds(values)),
  setFiltered: filtered => dispatch(setFiltered(filtered))
});

// connects redux statefull containers to presentational components
const BrowserContainer = connect(mapStateToProps, mapDispatchToProps)(Browser);

// export container for app
export default withTracker(() => {
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    brands: Brands.find().fetch(),
    merchants: Merchants.find().fetch(),
    byName: Products.find({}, { sort: { name: 1 } }).fetch(),
    lowHigh: Products.find({}, { sort: { price: 1 } }).fetch(),
    highLow: Products.find({}, { sort: { price: -1 } }).fetch(),
    users: Meteor.users.find().fetch()
  };
})(BrowserContainer);
