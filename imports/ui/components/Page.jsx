// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack, goProfile }) =>
  <div className="page">
    <Header history goBack={goBack} goProfile={goProfile}>
      {pageTitle}
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
