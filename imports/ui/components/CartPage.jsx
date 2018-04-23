// @flow

// Framework
import React from "react";

// Components
import CartHeader from "../components/CartHeader.jsx";
import Footer from "../components/Footer.jsx";

// Material UI

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export const CartPage = ({ children, pageTitle, history, goBack }) =>
  <div className="page">
    <CartHeader goBack={goBack} history>
      {pageTitle}
    </CartHeader>
    <main>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </main>
    <Footer />
  </div>;

export default CartPage;
