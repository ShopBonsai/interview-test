// @flow

// Framework
import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const Page = ({children, pageTitle, goBack, goUserPage}) => {

    return (
        <div className="page">
            <Header goBack={goBack} goUserPage={goUserPage}>
                {pageTitle}
            </Header>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );

};


export default Page;
