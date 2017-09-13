import React from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const SupportModal = ({ showModal, toggleModal }) =>
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
        <Button size="lg">Call Us</Button>
      </div>
      <div>
        <Button onClick={toggleModal} color="link">
          Close
        </Button>
      </div>
    </div>
  </Modal>;

export default SupportModal;
