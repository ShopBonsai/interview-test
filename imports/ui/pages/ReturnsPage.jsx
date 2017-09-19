// @flow

// Framework
import React, { Component } from "react";

// Libraries
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
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
    this.onItemReturnSelect = this.onItemReturnSelect.bind(this);
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
    this.setState({ showDrawer: !this.state.showDrawer, returnQuantity: 0 });
  }

  onItemReturnSelect(id) {
    this.props.updateSelectedForReturn(id);
  }

  onReturnQuantityClick(id, purchaseQuantity) {
    this.props.openReturnsDrawer(id, purchaseQuantity);
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  onReturnsDrawerInputChange(e) {
    this.setState({ returnQuantity: parseInt(e.target.value) });
  }

  onReturnsDrawerSubmit(e, id) {
    e.preventDefault();
    const { returnQuantity, showDrawer } = this.state;
    this.props.updateReturnsQuantity(id, returnQuantity);
    this.setState({ showDrawer: !showDrawer, returnQuantity: 0 });
  }

  render() {
    const { showModal, showDrawer, returnQuantity } = this.state;
    const { orderDetails, returns, openDrawerFor } = this.props;
    const {
      onToggleModal,
      onToggleDrawer,
      onItemReturnSelect,
      onReturnQuantityClick,
      onReturnsDrawerSubmit,
      onReturnsDrawerInputChange
    } = this;
    console.log("returns:", returns);
    return (
      <Page>
        <div className="header">
          <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
          <Header
            currentPage={1}
            totalPages={3}
            headerText={"How many items would you like to return?"}
          />
        </div>
        <button onClick={onToggleModal} className="support-button">
          Talk to Someone
        </button>
        <Drawer
          right={true}
          returns={returns}
          showDrawer={showDrawer}
          onToggleDrawer={onToggleDrawer}
          openDrawerFor={openDrawerFor}
          onReturnsDrawerSubmit={onReturnsDrawerSubmit}
          onReturnsDrawerInputChange={onReturnsDrawerInputChange}
          preSubmitQuantity={returnQuantity}
        />
        <SupportModal showModal={showModal} onToggleModal={onToggleModal} />
        <div>
          {orderDetails
            ? <MerchantOrders
                returns={returns}
                orderDetails={orderDetails}
                onItemReturnSelect={onItemReturnSelect}
                onReturnQuantityClick={onReturnQuantityClick}
              />
            : <p>Loading in 2017, lol</p>}
        </div>
        <div
          className="terms-and-conditions-button"
          onClick={() => alert("To infinity and beyond! 🚀")}
        >
          Terms and Conditions
          <i className="float-right fa fa-arrow-right" aria-hidden="true" />
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
  openReturnsDrawer: PropTypes.func,
  updateReturnsQuantity: PropTypes.func,
  updateSelectedForReturn: PropTypes.func
};

export default connect(mapStateToProps, actions)(ReturnsPage);
