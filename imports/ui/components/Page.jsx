// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

// Material UI

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export const Page = ({
  children,
  pageTitle,
  history,
  goBack,
  goCart,
  cartNumber
}) =>
  <div className="page">
    <Header goBack={goBack} goCart={goCart} history cartNumber={cartNumber}>
      {pageTitle}
    </Header>
    <main>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </main>
    <Footer />
  </div>;

export default Page;
