// Framework
import React from "react";

const Header = ({ children, goBack, goTo, goToTitle }) =>{
  return (
      <header>
        {goBack ? 
        <button onClick={goBack} className="back-button">
          {/* Image added here to show image inclusion, prefer inline-SVG. */}
          <img alt="Back" src={`/icon/header/back-white.svg`} />
        </button>
        : null }
        <h1>
          {children}
        </h1>
        {goTo ? <button onClick={goTo}>{goToTitle}</button> : <div className="right-content" /> }
      </header>
    )
}  

export default Header;
