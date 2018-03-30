// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({ children, pageTitle, history, goBack, checkout, register, login, logout }) =>
  <div className="page">
    <Header goBack={goBack} checkout={checkout} register={register} login={login} logout={logout} >
      {pageTitle}
    </Header>
    <main>
      {children}
    </main>
    <Footer />
  </div>;

export default Page;
