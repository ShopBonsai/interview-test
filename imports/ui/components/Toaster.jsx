// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

/*
    the Toaster component works as a ui 
    interaction with the user
*/ 
class Toaster extends Component {
    constructor(props) {
        super(props);
    }

    /* 
        this function renders the component if 
        a unexpected user action, in the purchase, 
        happens, like clicking on purchase button twice 
    */
    renderToaster = () => {
        if(this.props.open){
            return(<div className="toaster-style"><p>{this.props.message}</p></div>);
        }else{
            return null;
        }
    }

    /* 
        this method will trigger the 
        toaster component renderization
    */
    handleRaise = () => {
        this.props.raise();
    } 

    render() {
        return (
            <div onClick={this.handleRaise}>
                {this.renderToaster()}
            </div>    
        );
    }
}

export default Toaster;