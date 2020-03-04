import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import firebase from "firebase";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from "semantic-ui-react";

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

    signUp();
  };

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
          {"Welcome"}
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              autoComplete="username"
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
              {"Register"}
            </Button>
          </Segment>
        </Form>
        <Message>
          Already register? <Link to="/sign-in">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
