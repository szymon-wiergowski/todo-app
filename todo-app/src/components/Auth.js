import React, { useEffect, useState } from "react";

import firebase from "firebase";

const Auth = (props) => {
  const [user, setUser] = useState(null);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    return () => {
      const authRef = firebase.auth().onAuthStateChanged(user => {
        setUser(user);
      });
      setRef(authRef);
      if (ref) {
        ref();
      }
    };
  });

  return user ? (
    props.children
  ) : (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Please sign in</h1>
      </div>
    </>
  );
};

export default Auth;
