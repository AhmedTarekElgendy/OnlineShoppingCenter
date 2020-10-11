import React, { Component } from "react";
import Login from "./logIn";
import ReactDOM from "react-dom";
import AddUser from "./user_adding";

class Welcome extends Component {
  state = {};

  login() {
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  signup() {
    let ite = { UserName: "", Password: "", Type: "" };

    ReactDOM.render(
      <AddUser type={"Add"} da={ite} />,
      document.getElementById("root")
    );
  }
  render() {
    return (
      <div id="container">
        <button id="welcomlogin" onClick={this.login}>
          Login
        </button>
        <button id="welcomsignup" onClick={this.signup}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default Welcome;
