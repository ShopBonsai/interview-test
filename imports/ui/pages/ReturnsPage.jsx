// Framework
import React, { Component } from "react";

// Libraries
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Page from "../components/Page.jsx";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import SupportModal from "../components/SupportModal";
import MerchantOrders from "../components/MerchantOrders";

// Actions
import * as actions from "../redux/actions";

class ReturnsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDrawer: false,
      preSubmitQuantity: 0
    };

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onToggleDrawer = this.onToggleDrawer.bind(this);
    this.onItemReturnSelect = this.onItemReturnSelect.bind(this);
    this.onReturnQuantityClick = this.onReturnQuantityClick.bind(this);
    this.onReturnsDrawerSubmit = this.onReturnsDrawerSubmit.bind(this);
    this.onReturnsDrawerInputChange = this.onReturnsDrawerInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchLastOrder();
  }

  onToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  onToggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer, preSubmitQuantity: 0 });
  }

  onItemReturnSelect(id) {
    this.props.updateSelectedForReturn(id);
  }

  onReturnQuantityClick(id, purchaseQuantity) {
    this.props.openReturnsDrawer(id, purchaseQuantity);
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  onReturnsDrawerInputChange(e) {
    this.setState({ preSubmitQuantity: parseInt(e.target.value) });
  }

  onReturnsDrawerSubmit(e, id) {
    const { preSubmitQuantity, showDrawer } = this.state;
    e.preventDefault();
    // Check if user actually selected an input.
    if (preSubmitQuantity !== 0) {
      this.props.updateReturnsQuantity(id, preSubmitQuantity);
    }
    this.setState({ showDrawer: !showDrawer, preSubmitQuantity: 0 });
  }

  render() {
    const { orderDetails, returns, drawerTarget } = this.props;
    const { showModal, showDrawer, preSubmitQuantity } = this.state;

    return (
      <Page>
        <div className="header">
          <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
          <Header
            totalPages={3}
            currentPage={1}
            headerText={"How many items would you like to return?"}
          />
        </div>
        <button onClick={this.onToggleModal} className="support-button">
          Talk to Someone
        </button>
        <Drawer
          right={true}
          returns={returns}
          showDrawer={showDrawer}
          drawerTarget={drawerTarget}
          onToggleDrawer={this.onToggleDrawer}
          preSubmitQuantity={preSubmitQuantity}
          onReturnsDrawerSubmit={this.onReturnsDrawerSubmit}
          onReturnsDrawerInputChange={this.onReturnsDrawerInputChange}
        />
        <SupportModal
          showModal={showModal}
          onToggleModal={this.onToggleModal}
        />
        <div>
          {orderDetails
            ? <MerchantOrders
                returns={returns}
                orderDetails={orderDetails}
                onItemReturnSelect={this.onItemReturnSelect}
                onReturnQuantityClick={this.onReturnQuantityClick}
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
  const { orderDetails, returns, drawerTarget } = lastOrder;
  return { orderDetails, returns, drawerTarget };
};

ReturnsPage.propTypes = {
  returns: PropTypes.array,
  orderDetails: PropTypes.array,
  fetchLastOrder: PropTypes.func,
  drawerTarget: PropTypes.string,
  openReturnsDrawer: PropTypes.func,
  updateReturnsQuantity: PropTypes.func,
  updateSelectedForReturn: PropTypes.func
};

export default connect(mapStateToProps, actions)(ReturnsPage);
