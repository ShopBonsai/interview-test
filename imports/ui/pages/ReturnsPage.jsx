// @flow

// Framework
import React, { Component } from "react";

// Libraries
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
      showDrawer: false,
      returnQuantity: 0
    };

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onToggleDrawer = this.onToggleDrawer.bind(this);
    this.onReturnQuantityClick = this.onReturnQuantityClick.bind(this);
    this.onReturnsDrawerSubmit = this.onReturnsDrawerSubmit.bind(this);
    this.onReturnsDrawerInputChange = this.onReturnsDrawerInputChange.bind(
      this
    );
  }

  componentDidMount() {
    this.props.fetchLastOrder();
  }

  onToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  onToggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  onReturnQuantityClick(id, purchaseQuantity) {
    this.props.openReturnsDrawer(id, purchaseQuantity);
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  onReturnsDrawerInputChange(e) {
    this.setState({ returnQuantity: parseInt(e.target.value) });
  }

  onReturnsDrawerSubmit(e, id) {
    const { returnQuantity, showDrawer } = this.state;
    const data = { id, returnQuantity };
    console.log("data to be sent to redux-->", data);
    e.preventDefault();
    // Dispatch an action with data object.
    this.setState({ showDrawer: !showDrawer });
  }

  render() {
    const { showModal, showDrawer } = this.state;
    const { orderDetails, returns, openDrawerFor } = this.props;
    const {
      toggleModal,
      toggleDrawer,
      onReturnQuantityClick,
      onReturnsDrawerSubmit,
      onReturnsDrawerInputChange
    } = this;
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
        <Drawer
          right={true}
          returns={returns}
          showDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
          openDrawerFor={openDrawerFor}
          onReturnsDrawerSubmit={onReturnsDrawerSubmit}
          onReturnsDrawerInputChange={onReturnsDrawerInputChange}
        />
        <SupportModal showModal={showModal} toggleModal={toggleModal} />
        <div>
          {orderDetails
            ? <MerchantOrders
                orderDetails={orderDetails}
                toggleDrawer={toggleDrawer}
                onReturnQuantityClick={onReturnQuantityClick}
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

const mapStateToProps = ({ lastOrder }) => {
  const { orderDetails, returns, openDrawerFor } = lastOrder;
  return { orderDetails, returns, openDrawerFor };
};

ReturnsPage.propTypes = {
  returns: PropTypes.array,
  orderDetails: PropTypes.array,
  fetchLastOrder: PropTypes.func,
  openDrawerFor: PropTypes.string,
  openReturnsDrawer: PropTypes.func
};

export default connect(mapStateToProps, actions)(ReturnsPage);
