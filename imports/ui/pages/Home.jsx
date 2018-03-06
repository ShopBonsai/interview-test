// Framework
import React, { PureComponent } from "react";
import { Session } from 'meteor/session';

// Components
import Page from "../components/Page.jsx";
import ModalImpl from "../components/Modal.jsx";
import Button from "../components/Button.jsx";

// Containers
import UserForm from "../containers/UserForm";
import { Container } from "reactstrap";

class Home extends PureComponent {

    constructor(){
        super();
        this.state = {
            signUpModalFlag: false
        }
    }

    /*
     *****
     ***** Handles redirect
     *****
     */
    componentWillMount() {
        const userName = Session.get("user");
        if (userName) {
            this.props.history.push("/shop")
        }
    };

    /*
     *****
     ***** toggles sign-up modal
     *****
     */
    toggleSignUpModal = () => {
        this.setState(() =>
            ({
                signUpModalFlag: !this.state.signUpModalFlag
            })
        );
    };

  render() {
      let {signUpModalFlag} = this.state;

      let signUpModal = !signUpModalFlag ? null :(
          <ModalImpl
              className={"modal-form"}
              title={"Sign-Up"}
          >
              <UserForm formType={'Sign-Up'} history={this.props.history} />
          </ModalImpl>
      );

      return (
      <Page>
        <Container className="home-page">
            {signUpModal}
            <h2 className="title">Welcome to our humble Shop</h2>
            <UserForm formType={'Log-In'} history={this.props.history} />
            <Button type="button" onClick={() => this.toggleSignUpModal()}>
                Sign-Up
            </Button>
        </Container>
      </Page>
    );
  }

}

export default Home;
