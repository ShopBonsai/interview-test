// @flow

// Framework
import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import { Button } from "reactstrap";
import Page from "../components/Page.jsx";
import Header from "../components/Header";
import MerchantOrders from "../components/MerchantOrders";
import SupportModal from "../components/SupportModal";
import Drawer from "../components/Drawer";

// Actions
import * as actions from "../redux/actions";

class ReturnsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDrawer: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    this.props.fetchLastOrder();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {
    const { lastOrder } = this.props;
    const { toggleModal, toggleDrawer } = this;
    const { showModal, showDrawer } = this.state;
    return (
      <Page>
        <div>
          <div>←</div>
          <Header
            currentPage={1}
            totalPages={3}
            headerText={"How many items would you like to return?"}
          />
          <div>
            <Button color="primary" onClick={toggleModal}>
              Talk to someone
            </Button>
          </div>
        </div>
        <Drawer right={true} showDrawer={showDrawer} />
        <SupportModal showModal={showModal} toggleModal={toggleModal} />
        <div>
          {lastOrder
            ? <MerchantOrders
                lastOrder={lastOrder}
                toggleDrawer={toggleDrawer}
              />
            : <p>Loading in 2017, lol</p>}
        </div>
        <div>
          <Button color="primary">Terms & Conditions →</Button>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { lastOrder } = state;
  return { lastOrder };
};

export default connect(mapStateToProps, actions)(ReturnsPage);
