// import modules
import { connect } from "react-redux";
import Ui from "./";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  modalStatus: state.ui.modal.status
});

// connects redux statefull containers to presentational components
const UiContainer = connect(mapStateToProps)(Ui);

// export container for app
export default UiContainer;
