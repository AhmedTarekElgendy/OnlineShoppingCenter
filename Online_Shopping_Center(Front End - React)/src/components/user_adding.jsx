import React, { Component } from "react";
import Users from "./user";
import axios from "axios";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Home from "./home";
import img from "./images/logo.png";
import Login from "./logIn";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: this.props.da.UserName,
      Pass: this.props.da.Password,
      Type: this.props.da.Type,
      response: {}
    };
  }

  HandleAdd = () => {
    if (this.props.type === "Add") {
      axios
        .post("http://localhost:57260/api/user", {
          UserName: this.state.UserName,
          Password: this.state.Pass,
          Type: this.state.Type
        })
        .then(result => {
          if (result.data.ID) {
            ReactDOM.render(<Login />, document.getElementById("root"));
          }
        })
        .catch(error => {
          this.setState({ response: error.response.data.Message });
        });
    } else {
      axios
        .put("http://localhost:57260/api/user", {
          ID: this.props.da.ID,
          UserName: this.state.UserName,
          Password: this.state.Pass,
          Type: this.state.Type
        })
        .then(result => {
          ReactDOM.render(<Users />, document.getElementById("root"));
        })
        .catch(error => {
          this.setState({ response: error.response.data.Message });
        });
    }
  };

  HandleuserName = event => {
    this.setState({ UserName: event.target.value });
  };

  HandlePass = event => {
    this.setState({ Pass: event.target.value });
  };

  HandleType = event => {
    this.setState({ Type: event.target.value });
  };

  HandleBack() {
    ReactDOM.render(<Home />, document.getElementById("root"));
  }

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
            value={this.state.UserName}
            class="form-control form-control"
          ></input>
          <input
            id="inp5"
            placeholder="Password"
            type="password"
            onChange={this.HandlePass}
            value={this.state.Pass}
            class="form-control form-control"
          ></input>{" "}
          <select
            id="slt2"
            onChange={this.HandleType}
            defaultValue={this.state.Type}
          >
            <option></option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Owner">Owner</option>
          </select>
          <br />
          <button
            id="btnlogin1"
            onClick={this.HandleAdd}
            class="btn btn-primary"
          >
            Sign Up
          </button>
          <button id="btnback1" onClick={this.HandleBack} class="btn btn-dark">
            Back
          </button>
          <div id="error">{JSON.stringify(this.state.response)}</div>
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

export default AddUser;
