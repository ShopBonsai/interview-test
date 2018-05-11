// Framework
import React, { PureComponent } from "react";
import { Button } from "reactstrap";

// define component
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.enterShop = this.enterShop.bind(this);
  }
  componentDidMount() {
    document.title = "Bonsai Shop Home";
  }
  enterShop(event) {
    event.preventDefault();
    this.props.history.push("/shop");
  }
  render() {
    return (
      <div id="homepage">
        <div>
          <img src="icon/bonsai-white.svg" />
          <Button color="secondary" size="lg" block onClick={this.enterShop}>
            Enter Shop
          </Button>
        </div>
      </div>
    );
  }
}

// export component
export default Home;
