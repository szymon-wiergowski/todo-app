import React from "react";
import { Link } from "react-router-dom";

import { Menu, Button } from "semantic-ui-react";
import firebase from "firebase";

import FirebaseConfig from "../firebase/Firebase";

firebase.initializeApp(FirebaseConfig);

export default class Navigation extends React.Component {
  state = {
    user: null
  };

  handleSignOut = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <Menu inverted>
        <Link to="/">
          <Menu.Item name="home">Home</Menu.Item>
        </Link>
        <Link to="/todo">
          <Menu.Item name="todo">ToDo App</Menu.Item>
        </Link>
        <Menu.Menu position="right">
          {!!this.state.user ? (
            <>
              <Button inverted onClick={this.handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Link to="/sign-in">
              <Menu.Item name="Sign in" />
            </Link>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}
