import React from "react";

// Components

export const SplashPage = ({ children, pageTitle, history, goBack, goCart }) =>
  <div className="splashPage">
    <main>
      {children}
    </main>
  </div>;

export default SplashPage;
