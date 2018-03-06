// Framework
import React, { PureComponent } from "react";
import {authHandler} from '../../api/authentication/auth-handler';
import {Meteor} from "meteor/meteor";

// Components
import FormImpl from "../components/Form.jsx";
import ModalImpl from "../components/Modal.jsx";
import Button from "../components/Button.jsx";

class UserForm extends PureComponent {

    constructor() {
        super();
        this.state = {
            email: "",
            pass: "",
            serviceError: null,
            modalMessage: null
        };
    }

    /*
     *****
     ***** Logs users with auth-handler
     *****
     */
    logIn = (authenticationHandler) => {
        authenticationHandler.signinUser(
            this.state.email,
            this.state.pass,
            this.onLoginSuccess,
            this.onError
        );
    };

    /*
     *****
     ***** Registers users with auth-handler
     *****
     */
    signUp = (authenticationHandler) => {
        authenticationHandler.signupUser(
            this.state.email,
            this.state.pass,
            this.onSignUpSuccess,
            this.onError
        );
    };

    /*
     *****
     ***** Logs users with auth-handler's facebook provider
     *****
     */
    facebookLogin = (authenticationHandler) => {
        authenticationHandler.signinWithFacebook(
            this.onLoginSuccess,
            this.onError,
            this.onSignUpSuccess
        );
    };

    /*
     *****
     ***** callBack function for login being succesful. Will insert a log entry of the moment the User logged.
     *****
     */
    onLoginSuccess = (response) => {
        let logEntry = {
            userName: this.state.email,
            logTimeStamp: Date.now()
        };
        Meteor.call("logHistory.insertLogEntry", logEntry, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not insert log entry"}));
            } else {
                if (!response) return null;
                this.setState(() =>
                    ({
                        email: "",
                        pass: ""
                    })
                );
            }
        });
        this.props.history.push('/shop');
    };

    /*
     *****
     ***** Inserts user to the database after they have been inserted via auth-handler to firebase app.
     *****
     */
    onSignUpSuccess = (response) => {
        let user = {
            userName: this.state.email,
            details: {
                address: "",
                firstName: "",
                lastName: ""
            }
        };
        if(response.user) {
            user = {
                userName: response.user.email,
                details: {
                    address: "",
                    firstName: response.user.displayName.split(" ")[0],
                    lastName: response.user.displayName.split(" ").pop()
                }
            };

        }

        Meteor.call("users.insertUser", user, (error, response) => {
            if (error) {
                this.setState(() => ({serviceError: "Could not insert user to database"}));
            } else {
                let message = "Member sign-up success, try to log into the shop";
                if (!response) {
                    message = "Member already exists";
                }
                this.setState(() =>
                    ({
                        modalMessage: message
                    })
                );
            }
        });
    };

    /*
     *****
     ***** Sets the errorModal message
     *****
     */
    onError = (error) => {
        this.setState(() =>
            ({
                serviceError: error
            })
        );
    };

    /*
     *****
     ***** Cleans modal messages to prevent them to trigger again.
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
        const {serviceError, modalMessage} = this.state;
        const {formType, children} = this.props;
        const authenticationHandler = new authHandler();
        let onSubmit = this.signUp;
        let facebookLoginButton = null;
        let modal = null;

        if(formType === "Log-In"){
            onSubmit = this.logIn;
            facebookLoginButton = (
                <Button
                    type="button"
                    className="userForm-facebookButton"
                    onClick={() => this.facebookLogin(authenticationHandler)}
                >
                    <img alt="User" src={`/icon/components/button/button-facebook.svg`} /> Facebook Log-in
                </Button>
            );
        }

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
                    title={formType}
                    children={content}
                    onClose={() => this.cleanMessages()}
                />
            );
        }
        const fields = [
            {
                label: "Email",
                type: "email",
                onChange: (val) => this.setState({email: val})
            },
            {
                label: "Password",
                type: "password",
                onChange: (val) => this.setState({pass: val})
            }
        ];

        return(
           <div className="userForm">
               {modal}
               <FormImpl
                   className="userForm-container"
                   fields={fields}
                   submitButtonText={formType}
                   onSubmit={() => onSubmit(authenticationHandler)}
               >
                   {children}
                   {modal}
                   {facebookLoginButton}
               </FormImpl>
           </div>
        );
    }
}

export default UserForm;