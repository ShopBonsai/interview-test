// Framework
import React from "react";
import {Session} from "meteor/session";

const BackButton = ({goBack}) => (
    <button onClick={goBack} className="back-button">
        <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
);

const UserPageButton = ({goUserPage}) => {
    if(Session.get("user")) {
        return (
            <button onClick={goUserPage} className="user-button">
                <img alt="User" src={`/icon/components/button/button-user.svg`}/>
            </button>
        )
    }
    else{
        return null;
    }
};

const Header = ({ children, goBack, goUserPage }) =>
  <header>
    <BackButton goBack={goBack} />
    <h1>
      {children}
    </h1>
    <div className="right-content" >
        <UserPageButton goUserPage={goUserPage} />
    </div>
  </header>;

export default Header;
