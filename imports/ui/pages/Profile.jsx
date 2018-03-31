// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

//Component
import Page from "../components/Page.jsx";

class Profile extends PureComponent {
  constructor(){
    super();
    this.state={
      firstName: "",
      lastName: "",
      email: "",
      oldEmail: "",
      orderHistory: []
    }
  }

  componentWillMount(){
	const user = Meteor.user();
	const firstName = user.profile.firstName;
	const lastName = user.profile.lastName;
	const email = user.emails[0].address;
	const oldEmail = user.emails[0].address;
	this.setState({
	  firstName: firstName,
	  lastName: lastName,
	  email: email,
    oldEmail: oldEmail 
	})
	Meteor.call("orders.getOrderByUserId", Meteor.userId(), (error, response) => {
	  if (error) {
	    this.setState(() => ({ error: error }));
	  } else {
	    this.setState(() => ({ orderHistory: response }));
	  }
	});
  }

  goBack = () => this.props.history.push("/shop");

  checkout = () => this.props.history.push("/cart");

  userProfile = () => this.props.history.push("/profile");

  logout = (e) => {
    e.preventDefault();
    Meteor.logout((er) => {
      if(er){
        M.toast({html: er.reason, classes: 'rounded red', displayLength: '2000'});
      } else {
        M.toast({html: "Logout Successfully!", classes: 'rounded green', displayLength: '2000'});
        this.props.history.push("/shop");
      }
    })

  }
  
  updateProfile = (e) => {
    e.preventDefault();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      "profile.firstName": this.state.firstName,
      "profile.lastName": this.state.lastName
    }});
    M.toast({html: "Profile Updated Successfully!", classes: 'rounded green', displayLength: '2000'});
    this.props.history.push("/shop");
  }

  handleChange = (key) => (event) => {
    this.setState({[key]: event.target.value})
  }

  render(){

    return(	
          <Page pageTitle="My Profile" history goBack={this.goBack} logout={this.logout} userProfile={this.userProfile} checkout={this.checkout}>
    	  	<div className="container">
    	  	    <br /><br />
    		  	<div className="row">
    		  	  <form onSubmit={this.updateProfile} className="col s12">
    		  	    <div className="row">
    		  	      <div className="input-field col s6">
    		  	        <input value={this.state.firstName} id="first_name" type="text" className="validate" onChange={this.handleChange("firstName")} required/>
    		  	        <label className="active" htmlFor="first_name">First Name</label>
    		  	      </div>
    		  	      <div className="input-field col s6">
    		  	        <input value={this.state.lastName} id="last_name" type="text" className="validate" onChange={this.handleChange("lastName")} required/>
    		  	        <label className="active" htmlFor="last_name">Last Name</label>
    		  	      </div>
    		  	    </div>
    		  	    <button className="btn waves-effect waves-light" type="submit" name="action">
    			  	    <i className="material-icons right">send</i>
    			  	    Update Profile
    		  	    </button>
    		  	  </form>
    		  	</div>
            <div className="divider"></div>
            <div className="section">
              <h5>Email</h5>
              <p>{this.state.email}</p>
            </div>
            <div className="divider"></div>	
    	  	</div>
    	  </Page>	   
    )
  }
}

export default Profile;