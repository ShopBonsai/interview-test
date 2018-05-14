// import modules
import { connect } from "react-redux";
import UpdatePublished from "./";
import { showModal } from "../../../../redux/actions/ui";

// sets properties from state into properties for components
const mapStateToProps = (state, props) => ({
  status: props.status,
  id: props.id
});

// sets dispatch functions to be sent down to components as properties
const mapDispatchToProps = dispatch => ({
  showModal: (kind, message) => dispatch(showModal(kind, message))
});

// connects redux statefull containers to presentational components
const UpdatePublishedContainer = connect(mapStateToProps, mapDispatchToProps)(
  UpdatePublished
);

// export container for app
export default UpdatePublishedContainer;
