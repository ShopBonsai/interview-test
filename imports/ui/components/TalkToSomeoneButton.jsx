// Framework
import React from 'react';

// Components
import HelpModal from './HelpModal';

export class TalkToSomeoneButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  }

  render() {
    return (
      <div>
        <button className='talk-btn' onClick={this.handleClick}>
          Talk to Someone
        </button>
        <HelpModal
          show={this.state.isModalOpen}
          onClose={this.handleClick}
        >
        </HelpModal>
      </div>
    );
  }
}

export default TalkToSomeoneButton;
