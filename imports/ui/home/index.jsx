// Framework
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Jumbotron, Table, Button } from "reactstrap";

// define component
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.enterShop = this.enterShop.bind(this);
  }
  componentDidMount() {
    document.title = "Store Front at Bonsai Online Store";
  }
  enterShop(event) {
    event.preventDefault();
    this.props.history.push("/shop");
  }
  render() {
    return (
      <Container fluid id="store">
        <Jumbotron>
          <img src="icon/bonsai-white.svg" />
          <Button color="secondary" size="lg" block onClick={this.enterShop}>
            Enter Shop
          </Button>
        </Jumbotron>
      </Container>
    );
  }
}

// export component
export default Home;
