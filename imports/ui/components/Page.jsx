// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack, goTo, goToTitle }) =>
  <div className="page">
    <Header goBack={goBack} goTo={goTo} goToTitle={goToTitle}>
      {pageTitle}
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
