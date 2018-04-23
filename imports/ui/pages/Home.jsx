// Framework
import React, { PureComponent } from "react";

// Components
import SplashPage from "../components/SplashPage.jsx";
import Button from "../components/Button.jsx";

class Home extends PureComponent {
  render() {
    return (
      <SplashPage>
        <div className="home-page">
          <img
            src={
              "http://www.dreams.metroeve.com/wp-content/uploads/2017/05/dreams.metroeve_humble-dreams-meaning.png"
            }
          />
          <br />
          <h2 className="title">Welcome to our humble Shop</h2>
          <br />
          <Button
            onClick={() => {
              this.props.history.push("/shop");
            }}
          >
            Go shopping
          </Button>
        </div>
      </SplashPage>
    );
  }
}

export default Home;
