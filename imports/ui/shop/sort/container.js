// import modules
import { connect } from "react-redux";
import Sort from "./";
import { setSort } from "../../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  currentSort: state.ui.currentSort
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  setSort: sort => dispatch(setSort(sort))
});

// connects redux statefull containers to presentational components
const SortContainer = connect(mapStateToProps, mapDispatchToProps)(Sort);

// export container for app
export default SortContainer;
