// import modules
import { connect } from "react-redux";
import Browser from "./";
import { setFilter, unsetFilter, setProductShow } from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  filter: state.ui.filter,
  currentSort: state.ui.currentSort
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  unsetFilter: () => dispatch(unsetFilter()),
  setProductShow: id => dispatch(setProductShow(id))
});

// connects redux statefull containers to presentational components
const BrowserContainer = connect(mapStateToProps, mapDispatchToProps)(Browser);

// export container for app
export default BrowserContainer;
