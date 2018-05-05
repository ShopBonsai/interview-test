// import modules
import { connect } from "react-redux";
import Browser from "./";
// import { setFilter, unsetFilter } from "../../redux/actions/filter";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  filter: state.filter
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  unsetFilter: () => dispatch(unsetFilter())
});

// connects redux statefull containers to presentational components
const BrowserContainer = connect(mapStateToProps, mapDispatchToProps)(Browser);

// export container for app
export default BrowserContainer;
