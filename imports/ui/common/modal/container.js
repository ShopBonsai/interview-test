// import modules
import { connect } from "react-redux";
import Modal from "./";
import { closeModal, unsetProductShow } from "../../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  status: state.ui.modal.status,
  kind: state.ui.modal.kind,
  message: state.ui.modal.message
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  unsetProductShow: () => dispatch(unsetProductShow())
});

// connects redux statefull containers to presentational components
const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal);

// export container for app
export default ModalContainer;
