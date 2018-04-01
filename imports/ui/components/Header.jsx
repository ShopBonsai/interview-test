// Framework
import React from "react";
import { Button, Badge } from "reactstrap";

const Header = ({ children, goBack, visitors }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>

    <div style={{ marginRight: '2%' }} >
      <Button color="primary" outline>
        Visitors: <Badge 
          style={{ 
            color: 'black', 
            fontFamily: 'sans-serif'
            }} 
          color="secondary">{visitors}</Badge>
      </Button>
    </div>
  </header>;

export default Header;
