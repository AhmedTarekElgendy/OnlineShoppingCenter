import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Home from "./home";
import img from "./images/logo.png";
import bootstrap from "bootstrap/dist/css/bootstrap.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      UserName: "",
      Password: "",
      response: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:57260/api/user")
      .then(result => result.data)
      .then(response => this.setState({ items: response }))
      .catch(error => {
        console.log(error);
      });
  }
  HandleuserName = event => {
    this.setState({ UserName: event.target.value });
  };

  HandlePass = event => {
    this.setState({ Password: event.target.value });
  };

  Handleback() {
    ReactDOM.render(<Home />, document.getElementById("root"));
  }

  fire = () => {
    let len = this.state.items.filter(
      ite =>
        ite.UserName === this.state.UserName &&
        ite.Password === this.state.Password
    ).length;

    let user = this.state.items.filter(
      ite =>
        ite.UserName === this.state.UserName &&
        ite.Password === this.state.Password
    );

    if (len > 0) {
      ReactDOM.render(
        <Home
          name={this.state.UserName}
          User={user[0].ID}
          Type={user[0].Type}
        />,
        document.getElementById("root")
      );
    } else {
      this.setState({ response: "Please check your data" });
      ReactDOM.render(<Login />, document.getElementById("root"));
    }
  };

  Notlogged() {
    if (this.state.logged === "no") {
      return (
        <div id="navheader">
          <img id="imgheader" src={img} onClick={this.handlehome} />
        </div>
      );
    } else {
      return (
        <div id="navheader">
          <img id="imgheader" src={img} onClick={this.handlehome} />
        </div>
      );
    }
  }
  handlehome() {
    ReactDOM.render(<Home />, document.getElementById("root"));
  }

  render() {
    return (
      <div id="containerlogin">
        {this.Notlogged()}
        <div id="formlogin">
          <input
            placeholder="Username"
            id="inp4"
            type="text"
            onChange={this.HandleuserName}
            className="form-control form-control"
          ></input>
          <input
            placeholder="Password"
            id="inp5"
            type="password"
            onChange={this.HandlePass}
            className="form-control form-control"
          ></input>
          <button id="btnlogin" onClick={this.fire} className="btn btn-primary">
            Login
          </button>
          <button
            id="btnback"
            onClick={this.Handleback}
            className="btn btn-dark"
          >
            Back
          </button>
          <div id="error">{this.state.response}</div>
        </div>
        <div id="footer">
          © 2019 ONS.com <br />
          <label id="about" onClick={this.HandleProducts}>
            About us
          </label>
          <label id="privacy" onClick={this.HandleProducts}>
            Privacy Policy
          </label>
          <label id="terms" onClick={this.HandleProducts}>
            Terms and condition
          </label>
        </div>
      </div>
    );
  }
}

export default Login;
