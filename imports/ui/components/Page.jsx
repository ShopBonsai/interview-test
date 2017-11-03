// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({
  children,
  pageTitle,
  history,
  goBack,
  userActions,
  pView
}) =>
  <div className="page">
    <Header goBack={goBack} userActions={userActions}>
      {`${pageTitle} - viewed ${pView} times`}
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
