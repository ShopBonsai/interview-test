import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        let {className, title, children, onClose = () => {} }= this.props;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader className={className} toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                        {children}
                   </ModalBody>
                    <ModalFooter>
                        <Button color="danger"
                                onClick={() => {
                                    this.toggle();
                                    onClose();
                                }}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalImpl;
