// Framework
import React from "react";
import { AppBar, IconButton, Typography, Snackbar } from "material-ui";
import Slide from "material-ui/transitions/Slide";
import { ArrowBack, ShoppingCart } from "material-ui-icons";
import { connect } from "react-redux";
// Components
import Footer from "../components/Footer.jsx";
import Cart from "../components/Cart.jsx";

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

class Page extends React.Component {
  componentWillMount() {
    this._getCart();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { opened } = nextProps.Alert;
    if (opened) setTimeout(() => dispatch({ type: "CLOSE_ALERT" }), 4000); // hide alert after 4 seconds
  }

  openCartDialog = () => {
    const { dispatch } = this.props;

    dispatch({ type: "OPEN_CART_DIALOG" });
  };

  _getCart = () => {
    const { dispatch } = this.props;

    Meteor.call("carts.getCart", localStorage.cartId, (err, cart) => {
      if (err) {
        this.setState({ err });
      } else {
        dispatch({ type: "SET_CART", cart });
        localStorage.cartId = cart._id;
      }
    });
  };

  render() {
    const { children, pageTitle, goBack, Alert } = this.props;

    return (
      <div className="page">
        <AppBar position="static">
          <IconButton color="contrast" aria-label="Back" onClick={goBack}>
            <ArrowBack />
          </IconButton>
          <Typography type="title" color="inherit">
            {pageTitle}
          </Typography>
          <IconButton color="contrast" aria-label="Back">
            <ShoppingCart onClick={this.openCartDialog} />
          </IconButton>
        </AppBar>
        <Snackbar
          open={Alert.opened}
          transition={TransitionUp}
          message={Alert.message}
        />
        <Cart />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default connect(state => state)(Page);
