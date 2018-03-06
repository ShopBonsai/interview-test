// Framework
import React, {PureComponent} from "react";
import {Meteor} from "meteor/meteor";
import {Session} from 'meteor/session';

// Components
import Button from "../components/Button.jsx";
import Details from "../components/Details.jsx";
import ModalImpl from "../components/Modal.jsx";
import {Input, Label} from "reactstrap";

class Product extends PureComponent {


    /*
     *****
     ***** Static component to display the buy button, will change depending on whether the product is
     ***** on the cart or if there are no products available in stock.
     ***** Inserts the set amount of a product to the cart collection.
     */
    static BuyButton({isOnCart, productId, productName, price, userName, quantity, currentStock, handleBuyProduct, merchantId}) {
        let buyButton = null;

        if(currentStock < 1){
            buyButton = (
                <Button type="button" className="product-disabled" disabled>
                    Out of stock
                </Button>
            );
        } else if (!isOnCart ) {
            buyButton = (
                <Button onClick={() => handleBuyProduct(userName, {
                            merchantId,
                            productId,
                            productName,
                            price,
                            quantity
                })}>
                    Add {productName} to Cart
                </Button>
            );
        } else {
            buyButton = (
               <Button type="button" className="product-disabled" disabled>
                   Already on cart
               </Button>
           );
       }

       return buyButton;
    }

    /*
     *****
     ***** Static component to like/unlike the products.
     ***** Inserts/removes a like to the likes colections
     */
    static LikeButton({hasUserLike, merchantId, productId, userName, numberOfLikes, handleLikeProduct, handleUnlikeProduct}) {
        let likeButton = null;
        if (!hasUserLike) {
            likeButton = (
                <Button className="product-likeButton end-lg"
                        onClick={() => handleLikeProduct({
                            merchantId,
                            productId,
                            userName,
                            id: userName + "*" + productId
                        })}>
                    {`${numberOfLikes}:  `}<img alt="Cart" src={`/icon/components/button/button-like.svg`}/>
                </Button>
            );
        } else {
            likeButton = (
                <Button className="product-button-unlike end-lg"
                        onClick={() => handleUnlikeProduct(productId, userName)}>
                    {`${numberOfLikes}:  `}<img alt="Cart" src={`/icon/components/button/button-like.svg`}/>
                </Button>
            );
        }
        return likeButton;
    }

    /*
     *****
     ***** Static number input component, that is only displayed when the product can be bought.
     ***** Sets the product amount to be bought.
     */
    static BuyAmountField({handleQuantityToBuyChange, currentQuantity, maxQuantity, isOnCart}) {
        let numberField = null;

        if (maxQuantity > 0 && !isOnCart) {
            numberField = (
                <div>
                    <Label>Set order amount: </Label>
                    <Input className="product-number"
                           type="number"
                           min="1"
                           max={maxQuantity}
                           onChange={(e) => handleQuantityToBuyChange(e.target.value)}
                           value={currentQuantity}
                    />
                </div>
            );
        }
            return(
                numberField
            );
    }

    constructor(props){
        super(props);
        this.state = {
            likedByUser: false,
            numberOfLikes: 0,
            isOnCart: false,
            quantityToBuy: 1,
            quantity: props.quantity,
            mountError: false,
            serviceError: null,
            modalMessage: null
        };
    }
    /*
     *****
     ***** When mounting both the like and cart data will be loaded based on the product and userName.
     *****
     */
    componentDidMount(){
        const userName = Session.get('user');
        Meteor.call("likes.getLikesByProductId", this.props.id, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not get likes"}));
            } else {
                if (!response) return null;
                let userLike = response.filter( like => {
                    return like.userName === userName;
                });
                this.setState(() => (
                    {
                        numberOfLikes: response.length,
                        likedByUser: (userLike.length > 0)
                    })
                );
                Meteor.call("carts.getCartByUserName", userName, (error, response) => {
                    if (error) {
                        this.setState(() => ({serviceError: "Could not get cart details"}));
                    } else {
                        if (!response) return null;
                        let productInCart = response.items.filter( cartEntry => {
                            return cartEntry.productId === this.props.id;
                        });
                        this.setState(() => (
                            {
                                isOnCart: (productInCart.length > 0)
                            })
                        );
                    }
                });
            }
        });
    }


    /*
     *****
     ***** Inserts a cart entry from a product purchase details,
     ***** Sets the product availability from the merchants products to match said transaction.
     */
    handleBuyProduct = (userName, cartEntry) => {
        let {quantity} = this.props;
        let newStockValue = quantity - cartEntry.quantity;

        if(newStockValue < 0){
            this.setState(() => ({serviceError: "Not enough items of this type in Stock"}));
            return null;
        }

        Meteor.call("merchants.setProductAvailability", cartEntry.merchantId, cartEntry.productId, newStockValue, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not set product availability"}));
            } else {
                this.setState(() => (
                    {
                        isOnCart: true,
                        quantity: newStockValue
                    })
                );
                Meteor.call("carts.insertCartEntry", userName, cartEntry, (error, response) => {
                    if (error) {
                        this.setState(() => ({serviceError: "Could not put item into the cart"}));
                    } else {
                        this.setState(() => (
                            {
                                isOnCart: true,
                                modalMessage: "Item(s) placed on your cart"
                            })
                        );
                    }
                });
            }
        });


    };

    /*
     *****
     ***** Inserts an entry into the likes collection.
     *****
     */
    handleLikeProduct = (likeEntry) => {
        Meteor.call("likes.insertLike", likeEntry, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not like the product due to service error"}));
            } else {
                this.setState(() => (
                    {
                        numberOfLikes: this.state.numberOfLikes + 1,
                        likedByUser: true
                    })
                );
            }
        });
    };

    /*
     *****
     ***** Removes an entry into the likes collection.
     *****
     */
    handleUnlikeProduct = (productId, userName) => {
        Meteor.call("likes.removeLike", productId, userName, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not unlike product"}));
            } else {
                this.setState(() => (
                    {
                        numberOfLikes: this.state.numberOfLikes - 1,
                        likedByUser: false
                    })
                );
            }
        });
    };

    /*
     *****
     ***** Sets the quantity to buy.
     *****
     */
    handleQuantityToBuyChange = (value) => {
        this.setState({
            quantityToBuy: value
        });
    };

    /*
     *****
     ***** Cleans modal messages to prevent them to triggering again.
     *****
     */
    cleanMessages = () => {
        this.setState(() =>
            ({
                serviceError: null,
                modalMessage: null
            })
        );
    };

    render() {

        let {LikeButton, BuyButton, BuyAmountField} = Product;
        let {quantity, quantityToBuy, isOnCart, likedByUser, numberOfLikes, serviceError, modalMessage} = this.state;
        let userName = Session.get('user');
        let modal = null;

        let {
            merchantId,
            id,
            name = "Product",
            image,
            brand,
            color,
            description,
            price,
            size
        } = this.props;

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
                    title={"Product: " + name }
                    children={content}
                    onClose={() => this.cleanMessages()}
                />
            );
        }


        const info = [
            {label: "Brand", value: brand},
            {label: "Name", value: name},
            {label: "Description", value: description},
            {label: "Color", value: color},
            {label: "Size", value: size},
            {label: "Price", value: price},
            {label: "In stock", value: quantity},
        ];

        return (
            <div className="product">
                {modal}
                <img alt={name} src={image}/>
                <div className="details">
                    <Details info={info}/>
                    <BuyAmountField
                        handleQuantityToBuyChange={this.handleQuantityToBuyChange}
                        maxQuantity={quantity}
                        currentQuantity={quantityToBuy}
                        isOnCart={isOnCart}
                    />
                    <div className="product-button-container">
                        <BuyButton
                            isOnCart={isOnCart}
                            productId={id}
                            productName={name}
                            price={price}
                            userName={userName}
                            quantity={quantityToBuy}
                            currentStock={quantity}
                            merchantId={merchantId}
                            handleBuyProduct={this.handleBuyProduct}
                        />
                        <LikeButton
                            hasUserLike={likedByUser}
                            merchantId={merchantId}
                            productId={id}
                            userName={userName}
                            numberOfLikes={numberOfLikes}
                            handleLikeProduct={this.handleLikeProduct}
                            handleUnlikeProduct={this.handleUnlikeProduct}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
