// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import { Modal, Button } from "reactstrap";

const SupportModal = ({ showModal, onToggleModal }) =>
  <Modal isOpen={showModal} className="support-modal">
    <div className="support-modal-icon">
      <i className="fa fa-user-o fa-3x" aria-hidden="true" />
    </div>
    <div>
      <div className="support-modal-header">Need a hand?</div>
      <p className="support-modal-text">
        Push the call button and we'll gladly put you in touch with one of our
        knowledgable reps.
      </p>
    </div>
    <div>
      <button className="support-modal-button-primary">Call Us</button>
    </div>
    <div>
      <button
        onClick={onToggleModal}
        className="support-modal-button-secondary"
      >
        Close
      </button>
    </div>
  </Modal>;

SupportModal.propTypes = {
  showModal: PropTypes.bool,
  onToggleModal: PropTypes.func
};

export default SupportModal;
