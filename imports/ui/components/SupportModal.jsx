// Framework
import React from "react";

// Libraries
import PropTypes from "prop-types";

// Components
import { Modal, Button } from "reactstrap";

const SupportModal = ({ showModal, onToggleModal }) =>
  <Modal isOpen={showModal}>
    <div>📞😀</div>
    <div>
      <div>
        <p>Need a hand?</p>
        <p>
          Push the call button and we'll gladly put you in touch with one of our
          knowledgable reps.
        </p>
      </div>
      <div>
        <Button size="lg" color="primary">
          Call Us
        </Button>
      </div>
      <div>
        <Button onClick={onToggleModal} color="link">
          Close
        </Button>
      </div>
    </div>
  </Modal>;

SupportModal.propTypes = {
  showModal: PropTypes.bool,
  onToggleModal: PropTypes.func
};

export default SupportModal;
