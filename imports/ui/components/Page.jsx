// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack }) =>
  <div className="page">
    <Header goBack={goBack}>
      {pageTitle}
    </Header>
    <main className="container">
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
