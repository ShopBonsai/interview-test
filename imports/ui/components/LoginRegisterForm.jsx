
import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class LoginRegisterForm extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      password2:""
    }
  }

  onChangeInput = (ev)=>{
    const {name,value} = ev.target;
    this.setState({[name]:value});
  }

  submit = ()=>{
    this.props.submit(this.state);
  }

  render(){
    const {error,login} = this.props;
    if(login)
  		return (
          <div>
            <h2>Login Form</h2> 
            <h3>{error}</h3>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" onChange={this.onChangeInput} value={this.state.email} placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" onChange={this.onChangeInput} value={this.state.password} placeholder="password placeholder" />
              </FormGroup>
              <Button onClick={this.submit} >Login</Button>
            </Form>
          </div>
    		)
    else
      return (
        <div>
          <h2>Register Form</h2> 
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" onChange={this.onChangeInput} value={this.state.email} placeholder="" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" onChange={this.onChangeInput} value={this.state.password} placeholder="" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword2">Repeat Password</Label>
              <Input type="password" name="password2" id="examplePassword2" onChange={this.onChangeInput} value={this.state.password2} placeholder="" />
            </FormGroup>
            <Button onClick={this.submit} >Register</Button>
          </Form>
        </div>
      )

  }

}