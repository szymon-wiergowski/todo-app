import React from "react";
import { Route, Switch } from "react-router";

import ToDo from "../components/ToDo.js";
import SignIn from '../components/SignIn.js';
import SignUp from '../components/SignUp.js';
import Counter from '../components/Counter';

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <div style={{ textAlign: "center" }}>
          <h1>Welcome in simple app :)</h1>
        </div>
      </Route>
      <Route path="/counter" component={Counter} />
      <Route path="/todo" component={ToDo} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
            )} />
    </Switch>
  );
};