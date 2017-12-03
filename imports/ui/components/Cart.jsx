import React from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Avatar,
  Dialog,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from "material-ui";
import Slide from "material-ui/transitions/Slide";
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PlusOne as PlusOneIcon
} from "material-ui-icons";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const headerStyle = {
  justifyContent: "space-between",
  flexDirection: "row"
};

class Cart extends React.Component {
  handleRequestClose = () => {
    const { dispatch } = this.props;

    dispatch({ type: "CLOSE_CART_DIALOG" });
  };

  removeFromCart = productId => {
    const { dispatch, cart } = this.props;
    Meteor.call(
      "carts.removeFromCart",
      cart._id,
      productId,
      (err, response) => {
        if (!err) dispatch({ type: "REMOVE_FROM_CART", productId });
      }
    );
  };

  render() {
    const { cart } = this.props;

    return (
      <Dialog
        fullScreen
        open={cart.opened}
        onRequestClose={this.handleRequestClose}
        transition={Transition}
      >
        <AppBar style={headerStyle}>
          <IconButton
            color="contrast"
            onClick={this.handleRequestClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography type="title" color="inherit">
            Cart
          </Typography>
          <IconButton color="contrast" onClick={this.handleRequestClose}>
            <CheckCircleIcon />
          </IconButton>
        </AppBar>
        <List style={{ marginTop: "3rem" }}>
          {cart.products.length
            ? cart.products.map((item, i) =>
                <ListItem key={i} button>
                  <ListItemAvatar>
                    <Avatar src={item.image} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={`${item.quantity} x ${item.price}$`} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.removeFromCart.bind(this, item.id)}>
                      <DeleteIcon color="#e64646" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            : <p style={{ padding: "2rem", textAlign: "center" }}>Your cart is empty :(</p>}
        </List>
        <h2 style={{ padding: "2rem" }}>
          Total:&nbsp;{cart.products.reduce((amount, item) => item.price * item.quantity + amount, 0)}$
        </h2>
      </Dialog>
    );
  }
}

export default connect(state => state)(Cart);
