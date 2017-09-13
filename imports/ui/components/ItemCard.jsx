import React, { Component } from "react";

import { Card, Button } from "reactstrap";
import Drawer from "../components/Drawer";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showDrawer: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {
    const { showDrawer } = this.state;
    const { toggleDrawer } = this;
    return (
      <div>
        {showDrawer &&
          <Drawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />}
        {this.props.items.map((item, index) =>
          <Card key={index}>
            <div>
              <p>C${item.pricePerItem}</p>
              <p>{item.brand}</p>
              <p>{item.name}</p>
            </div>
            <div>Size {item.size}</div>
            <div>Colour {item.color}</div>
            <div>
              Return Quantity
              <Button color="link" onClick={toggleDrawer}>
                {`${0} of ${item.quantityPurchased}`} →
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default ItemCard;
