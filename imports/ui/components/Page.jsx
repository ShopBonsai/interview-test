// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack, item, toggleFade }) =>
  <div className="page">
    <Header goBack={goBack}>
      {pageTitle}
      <button onClick={toggleFade} className=" btn btn-success btn-toggle-cart">
             toggle cart {item}
      </button>
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
