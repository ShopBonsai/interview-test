// import modules
import { connect } from "react-redux";
import UpdateStatus from "./";
import { showModal } from "../../../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  orderId: props.orderId,
  status: props.status,
  orderStatus: props.orderStatus
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  showModal: (kind, message) => dispatch(showModal(kind, message))
});

// connects redux statefull containers to presentational components
const UpdateStatusContainer = connect(mapStateToProps, mapDispatchToProps)(
  UpdateStatus
);

// export container for app
export default UpdateStatusContainer;
