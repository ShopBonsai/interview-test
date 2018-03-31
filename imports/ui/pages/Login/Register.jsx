// Framework
import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base"


//Component
import Page from "../../components/Page.jsx";

class Register extends Component {
    registerUser = (event) => {
    	event.preventDefault();
    	var self = this;
    	if(self.password.value === self.confirmPassword.value && self.password.value !== '' && self.password.value.length >= 6){
          let accountInfo = {
          	username: '',
          	email: self.email.value,
          	password: self.password.value,
          	profile: {
          		firstName: self.firstName.value,
          		lastName: self.lastName.value,
          	}
          }
          Accounts.createUser( accountInfo, function(er){
            if(er){
              M.toast({html: er.reason, classes: 'rounded red', displayLength: '2000'});
            } else {
              M.toast({html: "Account Create Successfully!", classes: 'rounded green', displayLength: '2000'});
              self.props.history.push("/shop");
            }
          })

    	} else if(self.password.value === '') {
    	    M.toast({html: 'Password cannot be empty!', classes: 'rounded blue', displayLength: '2000'});
    	} else if(self.password.value.length < 6) {
    	    M.toast({html: 'Password must have more than six characters!', classes: 'rounded blue', displayLength: '2000'});        
    	} else {
    	    M.toast({html: 'Password Doesn\'t Match!', classes: 'rounded red', displayLength: '2000'});
    	}
    }

    checkout = () => this.props.history.push("/cart");

    register = () => this.props.history.push("/register");

    login = () => this.props.history.push("/login");
    
    goBack = () => this.props.history.push("/");

	render(){
	  return(
	  	<Page pageTitle="Register" history goBack={this.goBack} login={this.login} register={this.register} checkout={this.checkout}>
		  	<div className="container">
		  	    <br /><br />
			  	<div className="row">
			  	  <form onSubmit={this.registerUser} className="col s12">
			  	    <div className="row">
			  	      <div className="input-field col s6">
			  	        <input id="first_name" type="text" className="validate" ref={input => (this.firstName = input)} required/>
			  	        <label htmlFor="first_name">First Name</label>
			  	      </div>
			  	      <div className="input-field col s6">
			  	        <input id="last_name" type="text" className="validate" ref={input => (this.lastName = input)} required/>
			  	        <label htmlFor="last_name">Last Name</label>
			  	      </div>
			  	    </div>
			  	    <div className="row">
			  	      <div className="input-field col s12">
			  	        <input id="email" type="email" className="validate" ref={input => (this.email = input)} required/>
			  	        <label htmlFor="email">Email</label>
			  	      </div>
			  	    </div>
			  	    <div className="row">
			  	      <div className="input-field col s12">
			  	        <input id="password" type="password" className="validate" ref={input => (this.password = input)} />
			  	        <label htmlFor="password">Password</label>
			  	      </div>
			  	    </div>
			  	    <div className="row">
			  	      <div className="input-field col s12">
			  	        <input id="confirmPassword" type="password" className="validate" ref={input => (this.confirmPassword = input)} />
			  	        <label htmlFor="confirmPassword">Comfirm Password</label>
			  	      </div>
			  	    </div>
			  	    <button className="btn waves-effect waves-light" type="submit" name="action">
				  	    <i className="material-icons right">send</i>
				  	    Register
			  	    </button>
			  	  </form>
			  	</div>	
		  	</div>
	  	</Page>
	  );
	}
}

export default Register;