
import React from 'react'
import Button from './Button' 

export default class LoginRegisterForm extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      password2:"",
      message:{}
    }
  }

  onChangeinput = (ev)=>{
    const {name,value} = ev.target;
    this.setState({[name]:value}); 
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  submit = (ev)=>{
    ev.preventDefault();
    const {email,password,password2} = this.state;
    const {login} = this.props;
    let message = { 
      email: this.validateEmail(email) ? null : "please check your email",
    }

    if(login){
      message.password = password ? null : "please enter your passsword"
    } else {
      message.password = (password2 === password) ? null : "please reenter your password"
    }


    message.email || message.password ? this.setState({message}) : this.props.submit(this.state);
  }

  render(){
    const {error,login} = this.props;
    const {message,email,password,password2} = this.state
    if(login)
  		return (
          <div className="login-register-form">
            <h2>Login Form</h2> 
          <p className="error">{message.email}</p>
          <p className="error">{message.password}</p>
            <form>
              <div>
                <label htmlFor="exampleEmail">Email</label>
                <input type="email" name="email" id="exampleEmail" onChange={this.onChangeinput} value={email} placeholder="" />
              </div>
              <div>
                <label htmlFor="examplePassword">Password</label>
                <input type="password" name="password" id="examplePassword" onChange={this.onChangeinput} value={password} placeholder="password" />
              </div>
              <Button onClick={this.submit} style={{width:"100%"}} >Login</Button>
            </form>
          </div>
    		)
    else
      return (
        <div className="login-register-form">
          <h2>Register form</h2> 
          <p className="error">{message.email}</p>
          <p className="error">{message.password}</p>
          <form>
            <div>
              <label htmlFor="exampleEmail">Email</label>
              <input type="email" name="email" id="exampleEmail" onChange={this.onChangeinput} value={email} placeholder="email" />
            </div>
            <div>
              <label htmlFor="examplePassword">Password</label>
              <input type="password" name="password" id="examplePassword" onChange={this.onChangeinput} value={password} placeholder="password" />
            </div>
            <div>
              <label htmlFor="examplePassword2">Repeat Password</label>
              <input type="password" name="password2" id="examplePassword2" onChange={this.onChangeinput} value={password2} placeholder="repeat password" />
            </div>
            <Button onClick={this.submit} style={{width:"100%"}} >Register</Button>
          </form>
        </div>
      )

  }

}