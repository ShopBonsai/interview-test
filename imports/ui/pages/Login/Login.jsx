// Framework
import React, { Component } from "react";
import { Meteor } from 'meteor/meteor';

//Component
import Page from "../../components/Page.jsx";

class Login extends Component {

    handleLogin = (event) => {
    	event.preventDefault();
    	let self = this;
    	let email = self.email.value;
    	let password = self.password.value;
        Meteor.loginWithPassword(email, password, (er) => {
          if (er) {
            M.toast({html: er.reason, classes: 'rounded red', displayLength: '2000'});
          } else {
            M.toast({html: "Login Successfully!", classes: 'rounded green', displayLength: '1000'});
            self.props.history.push("/shop")
          }
        })
    }

    checkout = () => this.props.history.push("/cart");

    register = () => this.props.history.push("/register");
    
    goBack = () => this.props.history.push("/");

	render(){
	  return(
	  	<Page pageTitle="Login" history goBack={this.goBack} register={this.register} checkout={this.checkout}>
		  	<div className="container">
		  	    <br /><br />
			  	<div className="row">
			  	  <form className="col s12" onSubmit={this.handleLogin}>
				  	<div className="row">
			 	      <div className="input-field col s12">
                        <i className="fas fa-user-circle prefix"></i>
				        <input id="email" type="email" className="validate" ref={input => (this.email = input)} required/>
				  	    <label htmlFor="email">Email</label>
				  	  </div>
				  	</div>
			  	    <div className="row">
			  	      <div className="input-field col s12">
			  	        <input id="password" type="password" className="validate" ref={input => (this.password = input)} required/>
			  	        <label htmlFor="password">Password</label>
			  	      </div>
			  	    </div>
			  	    <button className="btn waves-effect waves-light" type="submit" name="action">
			  	    <i className="material-icons right">send</i>
			  	      Submit
			  	    </button>
			  	  </form>
			  	</div>	
		  	</div>
	  	</Page>
	  );
	}
}

export default Login;