// import modules
import { connect } from "react-redux";
import Filter from "./";
import { setFilter, unsetFilter } from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  unsetFilter: () => dispatch(unsetFilter())
});

// connects redux statefull containers to presentational components
const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

// export container for app
export default FilterContainer;
