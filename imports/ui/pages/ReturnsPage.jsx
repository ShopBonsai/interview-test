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
      showDrawer: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onReturnQuantityClick = this.onReturnQuantityClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchLastOrder();
  }

  onReturnQuantityClick(id, purchaseQuantity) {
    this.props.openReturnsDrawer(id, purchaseQuantity);
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {
    const { orderDetails } = this.props;
    const { showModal, showDrawer } = this.state;
    const { toggleModal, toggleDrawer, onReturnQuantityClick } = this;
    console.log(orderDetails);
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
          showDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
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
  const { orderDetails, returns } = lastOrder;
  return { orderDetails, returns };
};

ReturnsPage.propTypes = {
  fetchLastOrder: PropTypes.func,
  orderDetails: PropTypes.array,
  openReturnsDrawer: PropTypes.func,
  returns: PropTypes.array
};

export default connect(mapStateToProps, actions)(ReturnsPage);
