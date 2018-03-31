// Framework
import React from "react";
import { Meteor } from "meteor/meteor";

const Header = ({ children, goBack, checkout, register, login, logout, userProfile }) =>{
  if(Meteor.userId()){ 
    return(
      <header>
        <button onClick={goBack} className="back-button">
          {/* Image added here to show image inclusion, prefer inline-SVG. */}
          <img alt="Back" src={`/icon/header/back-white.svg`} />
        </button>
        <h1>
          {children}
        </h1>
        <button onClick={userProfile} className="userProfile">Profile</button>
        <button onClick={logout} className="logout">Logout</button>
        <button onClick={checkout} className="shopping-cart">
        {/* Shopping cart image added here */}
          <img alt="Cart" src={`/icon/header/shopping-cart.svg`} className="cart" />
        </button>
        <div className="right-content" />
      </header>
    ) 
  }else {
    return(
      <header>
        <button onClick={goBack} className="back-button">
          {/* Image added here to show image inclusion, prefer inline-SVG. */}
          <img alt="Back" src={`/icon/header/back-white.svg`} />
        </button>
        <h1>
          {children}
        </h1>
        <button onClick={login} className="login">Login</button>
        <button onClick={register} className="register">Register</button>
        <button onClick={checkout} className="shopping-cart">
        {/* Shopping cart image added here */}
          <img alt="Cart" src={`/icon/header/shopping-cart.svg`} className="cart" />
        </button>
        <div className="right-content" />
      </header>
    )
  }
}

export default Header;

