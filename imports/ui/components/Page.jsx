// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack, visitors }) =>
  <div className="page">
    <Header goBack={goBack} visitors={visitors}>
      {pageTitle}
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
