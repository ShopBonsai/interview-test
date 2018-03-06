// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Session } from 'meteor/session';

// Third-party
import MDSpinner from "react-md-spinner";

// Components
import { Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";
import ModalImpl from "../components/Modal.jsx";
import Details from "../components/Details.jsx";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalAmount: 0,
            itemLoadFlag: false,
            serviceError: null,
            modalMessage: null
        };
    }

    /*
     *****
     ***** Fetches the cart data from API and gets the order total amount
     *****
     */
    componentDidMount() {
        let userName = Session.get('user');
        if (!userName) {
            this.props.history.push("/");
        }
        Meteor.call("carts.getCartByUserName", userName, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not get cart details"}));
            } else {
                if (!response) {
                    this.setState(() =>
                        ({
                            itemLoadFlag: true
                        })
                    );
                    return null
                };
                let totalSumToPay = 0;
                response.items.forEach(item => {
                    totalSumToPay += (parseFloat(item.price) * parseFloat(item.quantity));
                });
                this.setState(() =>
                    ({
                        items: response.items,
                        totalAmount: totalSumToPay,
                        itemLoadFlag: true
                    })
                );
            }
        });
    }

    /*
     *****
     ***** Removes an item from  the cart and sets back the merchant product availability.
     *****
     */
    handleRemoveFromCart = (userName, productId, merchantId, price, quantity) => {
        Meteor.call("carts.removeItemFromUserCart", userName, productId, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not remove cart item"}));
            } else {
                this.setState(() => ({modalMessage: "Item removed from your cart"}));
                Meteor.call("merchants.rollBackProductAvailability", merchantId, productId, quantity, (error, response) => {
                    if (error) {
                        this.setState(() => ({serviceError: "Could not set the product availability back"}));
                    } else {
                        if (!response) return null;
                        let newUserCartItems = this.state.items.filter( item => {return item.productId !== productId});
                        this.setState(() =>
                            ({
                                items: newUserCartItems,
                                totalAmount: this.state.totalAmount - (parseFloat(price) * parseFloat(quantity))
                            })
                        );
                    }
                });
            }
        });
    };

    /*
     *****
     ***** Empties the cart and places an order based on the cart items.
     *****
     */
    handleCheckIn = (order) => {
        Meteor.call("orders.insertOrder", order, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not make order"}));
            } else {
                this.setState(() => ({modalMessage: "Order as been submitted"}));

                Meteor.call("carts.emptyUserCart", order.userName, (error, response) => {
                    if (error) {
                        this.setState(() => ({serviceError: "Could not empty cart"}));
                    } else {
                        this.setState(() =>
                            ({
                                items: [],
                                totalAmount: 0
                            })
                        );
                    }
                });

            }
        });
    };


    goBack = () => this.props.history.push("/shop");
    goUserPage = () => this.props.history.push("/user");

    cleanMessages = () => {
        this.setState(() =>
            ({
                serviceError: null,
                modalMessage: null
            })
        );
    };

    render() {
        let userName = Session.get('user');
        let currentTime = Date.now();
        const { items, serviceError, totalAmount, itemLoadFlag, modalMessage} = this.state;
        let cartPageContent = null;
        let modal = null;

        if (serviceError !== null || modalMessage !== null) {
            let content = modalMessage;
            let modalClassName = "modal-success";
            if (this.state.serviceError) {
                content = serviceError;
                modalClassName ="modal-error";
            }
            modal = (
                <ModalImpl
                    className={modalClassName}
                    title={"Cart"}
                    children={content}
                    onClose={() => this.cleanMessages()}
                />
            );
        }
        if(!itemLoadFlag) {
            cartPageContent = (
                    <Row className="cart-page">
                        <div className="cart-message-container">
                            <h1>{"Loading "}</h1>
                            <MDSpinner className="cart-spinner"/>
                        </div>
                    </Row>
            );
        } else if(items.length === 0){
            cartPageContent = (
                    <Row className="cart-page">
                        <div className="cart-message-container">
                           <h2>Your cart is empty</h2>
                        </div>
                    </Row>
            );
        } else {
            let cartEntryArray = [];

            items.forEach((item, key) => {
                const info = [
                    {label: "Name", value: item.productName},
                    {label: "Price", value: (item.price).toFixed(2)},
                    {label: "Quantity", value: item.quantity}
                ];

                cartEntryArray.push(
                    <Details info={info} key={key} >
                        <Button className="cart-deleteButton"
                                onClick={() => {
                                    this.handleRemoveFromCart(userName,
                                        item.productId,
                                        item.merchantId,
                                        item.price,
                                        item.quantity)
                                }}
                        >
                            X Remove
                        </Button>
                    </Details>);
            });

            cartPageContent = (
                <Row className="cart-page">
                    <Col className="cart-details">
                        {cartEntryArray}
                    </Col>
                    <Col className="cart-checkIn">
                        <label>Total Amount: {(totalAmount).toFixed(2)}</label>
                        <Button onClick={() => this.handleCheckIn(
                            {
                                userName: userName,
                                date: currentTime,
                                items: items
                            }
                        )}>Check-in Order</Button>
                    </Col>
                </Row>
            );
        }

        return(
            <Page pageTitle="cart" history goBack={this.goBack} goUserPage={this.goUserPage}>
                {modal}
                {cartPageContent}
            </Page>
        );
    }
}

export default Cart;

