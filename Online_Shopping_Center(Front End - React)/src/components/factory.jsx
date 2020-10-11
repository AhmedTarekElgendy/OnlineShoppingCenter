import React, { Component } from "react";
import axios from "axios";
import AddFactory from "./factory_adding";
import ReactDOM from "react-dom";
import { isThrowStatement } from "@babel/types";
import Home from "./home";
import Login from "./logIn";
import AddUser from "./user_adding";
import img from "./images/logo.png";

class Factories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      word: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:57260/api/factory")
      .then(result => result.data)
      .then(response => this.setState({ items: response }))
      .catch(error => {
        console.log(error);
      });
  }

  handlesearch = event => {
    this.setState({ word: event.target.value });
  };

  handledelete = id => {
    axios.delete("http://localhost:57260/api/factory" + "/" + id).then(
      this.setState({
        items: this.state.items.filter(item => item.ID !== id)
      })
    );
  };

  Add() {
    let it = {
      Name: "",
      Description: ""
    };
    ReactDOM.render(
      <AddFactory
        type={"Add"}
        da={it}
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  }

  Update = ite => {
    ReactDOM.render(
      <AddFactory type={"Update"} da={ite} />,
      document.getElementById("root")
    );
  };

  Notlogged() {
    if (this.state.logged === "no") {
      return (
        <div id="navheader">
          <img id="imgheader" src={img} onClick={this.handlehome} />
          <label id="lbllogin" onClick={this.login}>
            Login
          </label>
          <label id="lblsignup" onClick={this.signup}>
            Sign up
          </label>
        </div>
      );
    } else {
      return (
        <div id="navheader">
          <img id="imgheader" src={img} onClick={this.handlehome} />
          <label id="lblloged" onClick={this.login}>
            Welcome
          </label>{" "}
          <label id="username">{this.props.name}</label>
          <label id="logout" onClick={this.logout}>
            Log Out
          </label>
        </div>
      );
    }
  }
  handlehome = () => {
    ReactDOM.render(
      <Home
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  login() {
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  logout = () => {
    this.setState({ logged: "no" });
  };

  signup() {
    let ite = { UserName: "", Password: "", Type: "" };

    ReactDOM.render(
      <AddUser type={"Add"} da={ite} />,
      document.getElementById("root")
    );
  }

  render() {
    return (
      <div>
        {this.Notlogged()}

        <button
          id="btnaddfactinfactories"
          onClick={this.Add}
          className="btn btn-primary"
        >
          Add factory
        </button>
        <input
          type="text"
          placeholder="Search"
          onChange={this.handlesearch}
        ></input>

        <br></br>
        <table id="tblfactories">
          <thead id="thead">
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Image</td>
              <td>Operations</td>
            </tr>
          </thead>
          <tbody>
            {this.state.items
              .filter(
                item =>
                  item.Name ===
                  (this.state.word === "" ? item.Name : this.state.word)
              )
              .map(item => (
                <tr id="trbody" key={item.ID} className="m-3">
                  <td id="producttbodycell">{item.Name}</td>
                  <td id="producttbodycell">{item.Description}</td>
                  <td id="producttbodycell">
                    <img
                      id="tblprodimg"
                      src={"data:image/png;base64," + item.Img}
                      alt=""
                    />
                  </td>
                  <td id="producttbodycell">
                    <button
                      id="btndeletefac"
                      onClick={() => this.handledelete(item.ID)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      id="btndeletefac"
                      onClick={() => this.Update(item)}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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

export default Factories;
