import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { AutoComplete, RaisedButton, Snackbar } from "material-ui";
import { connect } from "react-redux";

import moment from "moment";

import Page from "../components/Page.jsx";
import CreateMerchantForm from "../components/CreateMerchantForm.jsx";

const initialFormState = {
  merchant: { value: "", error: null },
  phone: { value: "", error: null },
  address: { value: "", error: null },
  contactEmail: { value: "", error: null }
};

const EMPTY_FIELD = "Empty field. Please, fill up.";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      selectedItem: null,
      openForm: false,
      formState: initialFormState
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        dispatch({ type: "FETCH_ALL", payload: response });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { merchants } = nextProps.merchantsReducer;
    const { selectedItem } = this.state;
    if (selectedItem) {
      const merchant = merchants.find(item => item._id === selectedItem._id);
      if (!merchant) this.setState({ selectedItem: null, searchText: "" });
    }
  }

  renderSelectedProduct() {
    const { selectedItem } = this.state;
    return (
      <div className="info-content">
        <span>
          Id:
          {selectedItem._id}
        </span>
        <span>
          Name:
          {selectedItem.merchant}
        </span>
        <span>
          Address:
          {selectedItem.address}
        </span>
        <span>
          Contact email:
          {selectedItem.contactEmail}
        </span>
        <span>
          Phone:
          {selectedItem.phone}
        </span>
        <span>
          Publish Date:
          {moment(selectedItem.publishDate).format("D-MMM-YYYY")}
        </span>
        <div style={{ marginTop: 45, marginBottom: 22 }}>
          <RaisedButton
            label="Do you want to delete this merchant?"
            onClick={this.deleteProduct}
            secondary={true}
          />
        </div>
      </div>
    );
  }

  deleteProduct = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;
    Meteor.call(
      "merchants.deleteMerchant",
      selectedItem._id,
      (error, response) => {
        if (error) {
          this.setState(() => ({ error: error }));
        } else {
          dispatch({ type: "DELETE_MERCHANT", payload: selectedItem._id });
          dispatch({
            type: "OPEN_SNACKBAR",
            payload: "Item deleted with success!"
          });
          setTimeout(() => {
            dispatch({ type: "CLOSE_SNACKBAR" });
          }, 1000);
        }
      }
    );
  };

  handleUpdateInput = searchText => {
    this.setState({
      searchText
    });
  };

  handleSelectedItem = selectedItem => {
    this.setState({
      selectedItem,
      openForm: false
    });
  };

  handleCreateMerchantForm = () =>
    this.setState({
      openForm: !this.state.openForm,
      selectedItem: null,
      searchText: ""
    });

  validate(field, value) {
    if (value.trim() === "") {
      this.setState({
        formState: {
          ...this.state.formState,
          [field]: {
            error: EMPTY_FIELD
          }
        }
      });
      return false;
    }
    return true;
  }

  handleFormChange = (field, value) => {
    if (!this.validate(field, value)) return;

    this.setState({
      formState: {
        ...this.state.formState,
        [field]: {
          error: null,
          value
        }
      }
    });
  };

  handleSaveMerchante = () => {
    const { dispatch } = this.props;
    const { formState } = this.state;

    const payload = {
      merchant: formState.merchant.value,
      phone: formState.phone.value,
      contactEmail: formState.contactEmail.value,
      address: formState.address.value
    };
    payload.publishDate = moment().format();

    Meteor.call("merchants.createMerchant", payload, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        dispatch({
          type: "ADD_MERCHANT",
          payload: { ...payload, _id: response }
        });
        dispatch({
          type: "OPEN_SNACKBAR",
          payload: "Item created with success!"
        });
        setTimeout(() => {
          dispatch({ type: "CLOSE_SNACKBAR" });
        }, 1000);

        this.setState({ formState: initialFormState, openForm: false });
      }
    });
  };

  goBack = () => this.props.history.push("/");

  render() {
    const {
      searchText,
      dataSource,
      selectedItem,
      openForm,
      formState
    } = this.state;

    let isDisabled = false;
    Object.values(formState).forEach(item => {
      if (item.value === "" || item.error) {
        isDisabled = true;
      }
    });

    const { merchants, message, openSnackbar } = this.props.merchantsReducer;

    return (
      <Page pageTitle="Admin page" history goBack={this.goBack}>
        <div className="admin-page">
          <AutoComplete
            hintText="Type the name of the merchant"
            dataSource={merchants}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleSelectedItem}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={{ text: "merchant", value: "id" }}
            searchText={searchText}
            maxSearchResults={10}
            style={{ margin: "0 auto" }}
          />
          {selectedItem && this.renderSelectedProduct()}
          <span>Or</span>
          <h5
            className="btn-create-merchant"
            onClick={this.handleCreateMerchantForm}
          >
            Create a new Merchant
          </h5>
          {openForm &&
            <CreateMerchantForm
              data={formState}
              onFormChange={this.handleFormChange}
              onSave={this.handleSaveMerchante}
              disableSaveButton={isDisabled}
            />}
          <Snackbar
            open={openSnackbar}
            message={message}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </Page>
    );
  }
}

export default connect(state => state)(Admin);
