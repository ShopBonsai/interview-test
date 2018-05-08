// import modules
import { connect } from "react-redux";
import Items from "./";
// import { unsetProductShow, setFilter } from "../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({});

// connects redux statefull containers to presentational components
const ItemsContainer = connect(mapStateToProps, mapDispatchToProps)(Items);

// export container for app
export default ItemsContainer;
