// Framework
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class Register extends PureComponent {
  
  componentDidMount() {
    this.props.viewChange();
  }

  render(){

    const { username, password, error, handleChange, register } = this.props;

    return (
      <div className="card mt-4" >
        <div className="card-body" >
          <form className="login-form text-center container" onSubmit={register} >
            <h3 className="mt-3 mb-2" >Register</h3>
            { error ? <p style={{color: "red"}} >{ error.reason }</p> : "" }
            <input required type="username" className="form-control text-center my-1" id="username" placeholder="Username" value={username} onChange={handleChange} />
            <input required type="password" className="form-control text-center my-1" id="password" placeholder="Password" value={password} onChange={handleChange} />
            <input required pattern={password} type="password" className="form-control text-center my-1" id="rptPassword" placeholder="Re-Enter Password" />
            <button type="submit" className="btn btn-primary mt-2 mb-3">Login</button>
          </form>
          <div className="card-footer text-center" >
            <p >Already a member? Click <Link to="/login" >here</Link> to log in.</p>
          </div>
        </div>
      </div>
    );
  };
};

export default Register;