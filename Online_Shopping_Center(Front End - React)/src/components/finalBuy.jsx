import React, { Component } from "react";
import Products from "./product";
import ReactDOM from "react-dom";
import axios from "axios";
import Home from "./home";
import Login from "./logIn";
import AddUser from "./user_adding";
import img from "./images/logo.png";
import img2 from "./images/buy.jpg";
import ProductOnCard from "./oncardproducts";

class FinalBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      address: "",
      products: "",
      response: {},
      logged: "no",
      totalprice: this.props.totalprice
    };
  }

  componentDidMount() {
    if (this.props.User !== undefined) {
      this.setState({ logged: "yes" });
    }
  }

  handlebackoncardproducts = () => {
    ReactDOM.render(
      <ProductOnCard
        factoryid={this.props.factoryid}
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  handleformsubmit(event) {
    event.preventDefault();
  }

  Handlename = event => {
    this.setState({ name: event.target.value });
  };

  Handlephone = event => {
    this.setState({ phone: event.target.value });
  };

  Handleaddress = event => {
    this.setState({ address: event.target.value });
  };

  HandleSubmit = event => {
    event.preventDefault();
  };

  HandleSave = () => {
    let elements = this.props.das;
    let productidnum = "";
    let strproducts = "";
    for (var key in elements) {
      if (key !== "0") {
        strproducts += "," + elements[key].ID;
      } else {
        strproducts += elements[key].ID;
      }
    }

    let ind = 0;
    for (var key2 in elements) {
      if (key2 !== "0") {
        if (ind === elements.length - 1) {
          console.log(ind, "  1  ", productidnum);
          productidnum +=
            "_" +
            elements[key2].ID +
            "," +
            this.props.saveditemswithtotalandnum[key2].num;
        } else {
          console.log(ind, "   2  ", productidnum);

          productidnum +=
            "_" +
            elements[key2].ID +
            "," +
            this.props.saveditemswithtotalandnum[key2].num;
        }
      } else {
        console.log(ind, "   3  ", productidnum);

        productidnum +=
          elements[key2].ID +
          "," +
          this.props.saveditemswithtotalandnum[key2].num;
      }
      ind = ind + 1;
    }

    axios
      .post("http://localhost:57260/api/buying", {
        UserID: this.props.User,
        ProductID: strproducts,
        Address: this.state.address,
        Phone: this.state.phone,
        Name: this.state.name,
        TotalPrice: this.state.totalprice
      })
      .then(result => {
        if (result.data.ID) {
          ReactDOM.render(
            <Products
              factoryid={this.props.factoryid}
              User={this.props.User}
              name={this.props.name}
              Type={this.props.Type}
            />,
            document.getElementById("root")
          );
        }
      })
      .catch(error => {
        this.setState({ response: error.response.data.Message });
      });

    axios
      .put("http://localhost:57260/api/card?productidandnum=" + productidnum)
      .then(result => {})
      .catch(error => {
        this.setState({ response: error.response.data.Message });
      });
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
    ReactDOM.render(<Home />, document.getElementById("root"));
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
        <form id="formfinalbuy" onSubmit={this.HandleSubmit}>
          <img id="imgbackground" src={img2} />
          <input
            id="inplast"
            placeholder="Name"
            type="text"
            onChange={this.Handlename}
            className="form-control form-control"
          />
          <br />
          <input
            id="inplast1"
            type="text"
            placeholder="Phone (+20)"
            onChange={this.Handlephone}
            className="form-control form-control"
          />
          <br />
          <input
            id="inplast3"
            type="text"
            readOnly={true}
            value={this.state.totalprice}
            className="form-control form-control"
          />
          <br />
          <input
            id="inplast2"
            type="text"
            placeholder="Address"
            onChange={this.Handleaddress}
            className="form-control form-control"
          />
          <br />

          <button
            id="btnsave"
            onClick={this.HandleSave}
            className="btn btn-primary"
          >
            Save
          </button>

          <button
            id="btnbacktocard"
            onClick={this.handlebackoncardproducts}
            className="btn btn-secondary"
          >
            Back
          </button>
          <div id="error1">{JSON.stringify(this.state.response)}</div>
        </form>
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

export default FinalBuy;
