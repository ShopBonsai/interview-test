// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router";

// Components
import Button from "./Button.jsx";
import QuantitySelector from "./QuantitySelector.jsx";

// Material UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

//database
import { Orders } from "../../api/orders/collection";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quanitity: 0,
      order: [],
      open: false
    };
  }

  onQuantitySelect(quantity) {
    this.setState({ quanitity: quantity });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.onAddToCart({
            name: name,
            price: price,
            quantitiy: quantity
          });
          console.log({
            name: name,
            price: price,
            quantitiy: quantity
          });
          this.handleClose()
        }}
      />
    ];

    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];

    let quantity = this.state.quanitity;
    let { order } = this.state;

    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <div className="info">
            {info.map(({ label, value }) =>
              <div className="info-row" key={`${name}-${label}-${value}`}>
                <div className="label">
                  {label}:
                </div>
                <div className="value">
                  {value}
                </div>
              </div>
            )}
          </div>
          <QuantitySelector
            onQuantitySelect={this.onQuantitySelect.bind(this)}
          />
          <br />
          <Button
            label="Dialog"
            onClick={() => {
              if (quantity === 0) {
                alert("Quantity not selected!");
              } else {
                this.handleOpen();
              }
            }}
          >
            Add {name} to cart
          </Button>
          <div>
            <Dialog
              title="Great Choice!"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to add {quantity} {name} into your cart?.
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
