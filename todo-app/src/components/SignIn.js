import React, { useState } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from "semantic-ui-react";
import firebase from "firebase";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleOnChange = event => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleOnClick = event => {
    event.preventDefault();

    signIn();
  };

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setRedirect(true);
      });
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          {"Log-in to your account"}
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              autoComplete="email"
              value={email}
              name="email"
              onChange={handleOnChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              autoComplete="current-password"
              type="password"
              value={password}
              name="password"
              onChange={handleOnChange}
            />
            <Button color="blue" fluid size="large" onClick={handleOnClick}>
              {"Login"}
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/sign-up">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
