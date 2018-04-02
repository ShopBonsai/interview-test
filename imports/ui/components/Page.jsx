// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack, goCart, firstpage }) =>
  <div className="page">
    <Header goBack={goBack} goCart={goCart} firstpage={firstpage}>
      {pageTitle}
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
