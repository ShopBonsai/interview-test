import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Modal, Button } from "react-bootstrap/";
import { toPairs, pick } from "lodash";
export class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }
  componentWillMount() {
    Meteor.call(
      "merchants.getProductById",
      this.props.product.id,
      (error, response) => {
        if (error) {
          console.error(error);
          this.setState(() => ({ error: error }));
        } else {
          this.setState({ product: response });
        }
      }
    );
  }
  render() {
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              {this.state.product.name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="pm-product">
              <img
                alt={this.state.product.name}
                src={this.state.product.image}
              />
              <div className="details">
                <div className="info">
                  {toPairs(
                    pick(this.state.product, [
                      "name",
                      "brand",
                      "color",
                      "description",
                      "price",
                      "size"
                    ])
                  ).map(row =>
                    <div key={row[0]}>
                      <strong>
                        {row[0]}:
                      </strong>
                      <label>
                        {row[1]}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.props.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}
