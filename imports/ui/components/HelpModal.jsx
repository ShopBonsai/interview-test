import React from 'react';
import PropTypes from 'prop-types';

class HelpModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className='help-modal-frame'>
        <div className='help-modal'>
          <div className='modal-header'></div>
          <div className='modal-content'>
            <div className='modal-title'>Need a hand?</div>
            <div className='modal-text'>Push the call button and we'll <br/> gladly put you in touch with one of <br/> our knowledgeable reps.</div>
            <button className='call-us-btn'>
              Call Us
            </button>
            <button className='close-help-btn' onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
HelpModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default HelpModal;
