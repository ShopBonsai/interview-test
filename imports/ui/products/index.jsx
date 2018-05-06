// Framework
import React, { PureComponent } from "react";
import { Container } from "reactstrap";
import MainNav from "../mainNav/index";
import NavHeader from "../navHeader/index";
import All from "./all";
import One from "./one";

// define component
class Products extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.title = "Products at Bonsai Online Store";
  }
  render() {
    return (
      <Container fluid id="products-page">
        <NavHeader
          heading="Bonsai Products"
          subtitle="Browse our full collection of exciting products here!"
          id="products-head"
        />
        {this.props.productShow !== ""
          ? <One productShow={this.props.productShow} />
          : <All />}
      </Container>
    );
  }
}

// export component
export default Products;
