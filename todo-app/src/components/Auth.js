import React from "react";

import firebase from "firebase";

// const Auth = () => {
//   state = {
//     user: null,
//     ref: null
//   };

//   componentDidMount() {
//     const authRef = firebase.auth().onAuthStateChanged(user => {
//       this.setState({
//         user
//       });
//     });
//     this.setState({
//       ref: authRef
//     });
//   }

//   componentWillUnmount() {
//     if (this.state.ref) {
//       this.state.ref();
//     }
//   }

  
//     return this.state.user ? (
//       this.props.children
//     ) : (
//       <>
//         <div style={{ textAlign: "center" }}>
//           <h1>Please sign in</h1>
//         </div>
//       </>
//     );
// }

export default class Auth extends React.Component {
  state = {
    user: null,
    ref: null
  };

  componentDidMount() {
    const authRef = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
    this.setState({
      ref: authRef
    });
  }

  componentWillUnmount() {
    if (this.state.ref) {
      this.state.ref();
    }
  }

  render() {
    return this.state.user ? (
      this.props.children
    ) : (
      <>
        <div style={{ textAlign: "center" }}>
          <h1>Please sign in</h1>
        </div>
      </>
    );
  }
}
