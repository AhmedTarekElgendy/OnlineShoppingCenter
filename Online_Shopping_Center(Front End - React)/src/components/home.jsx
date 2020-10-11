import React, { Component } from "react";
import ReactDOM from "react-dom";
import Products from "./product";
import Factories from "./factory";
import Login from "./logIn";
import axios from "axios";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import App from "../App";
import AddUser from "./user_adding";
import img from "./images/logo.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.User,
      factoryitems: [],
      items: [],
      logged: "no"
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:57260/api/product")
      .then(result => result.data)
      .then(response => this.setState({ items: response }))
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:57260/api/factory")
      .then(result => result.data)
      .then(response => this.setState({ factoryitems: response }))
      .catch(error => {
        console.log(error);
      });

    if (this.props.User !== undefined) {
      this.setState({ logged: "yes" });
    }
  }

  HandleFactpries() {
    ReactDOM.render(<Factories />, document.getElementById("root"));
  }

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

  handlehome() {
    ReactDOM.render(<Home />, document.getElementById("root"));
  }

  logout = () => {
    this.setState({ logged: "no" });
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

  displayproducts = id => {
    ReactDOM.render(
      <Products
        factoryid={id}
        name={this.props.name}
        User={this.props.User}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  render() {
    return (
      <div id="homecontainer">
        {this.Notlogged()}
        {console.log("Type", this.props.Type)}
        <div id="dropdown">
          {this.state.factoryitems.map(factitem => (
            <button
              id="dropbtn"
              key={factitem.ID}
              onClick={() => this.displayproducts(factitem.ID)}
            >
              {factitem.Name}
            </button>
          ))}
        </div>
        <div id="homebody">
          <div>{<App ds={this.state.items} />}</div>
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

export default Home;
