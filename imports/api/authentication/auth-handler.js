import * as firebase from "firebase";
import { Session } from "meteor/session";

export class authHandler {
  token = "";
  /*
*
* Fire base methods to handle sign-up, log-in and facebook access using firebase/facebook app.
*
*/
  signupUser(email, password, onSuccess, onError) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        onSuccess(data);
      })
      .catch(error => {
        onError(
          "Unable to register new user, try again with a valid email and password, password must contain 6 characters"
        );
      });
  }

  signinUser(email, password, onSuccess, onError) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getToken().then(token => {
          this.token = token;
        });
        Session.set("user", email);
        Session.set("token", this.token);
        onSuccess(response);
      })
      .catch(error => {
        onError("Invalid email or password");
      });
  }

  signinWithFacebook(onSuccess, onError, onNewUserCreation) {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: "popup"
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => {
        Session.set("user", response.user.email);
        Session.set("token", response.credential.accessToken);
        if (response.additionalUserInfo.isNewUser) {
          onNewUserCreation(response);
        }
        onSuccess(response);
      })
      .catch(function(error) {
        onError("Facebook service error");
      });
  }

  logout() {
    firebase.auth().signOut();
    Session.set("user", undefined);
    Session.set("token", undefined);
    this.token = null;
  }
}
