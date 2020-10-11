import React, { Component } from "react";
import Products from "./product";
import ReactDOM from "react-dom";
import FinalBuy from "./finalBuy";
import Home from "./home";
import Login from "./logIn";
import AddUser from "./user_adding";
import img from "./images/logo.png";
import axios from "axios";
import { connect } from "react-redux";
import { Getsaveditems } from "../redux/saveitemsActions";

class ProductOnCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: "no",
      saveditems: [],
      saveditemswithtotalprice: [],
      availableproducts: [],
      productobj: {},
      er: ""
    };
  }

  componentDidMount() {
    if (this.props.User !== undefined) {
      this.setState({ logged: "yes" });
    }

    this.setState({ saveditems: this.props.saveditems });
  }

  HandleRemove = id => {
    //handle remove product from card
    this.setState({
      saveditems: this.state.saveditems.filter(ite => ite.ID !== id)
    });
  };

  Ressetarrayvalues = () => {
    this.state.availableproducts = [];
  };

  Calculatetotalprice = (id, price, event) => {
    let totalprice = price * event.target.value * 1;
    var produobj = this.state.saveditems.filter(ite => ite.ID === id);
    produobj.totalprice = totalprice;
    produobj.num = event.target.value;

    this.setState({ productobj: produobj });
    if (this.state.productobj !== {}) {
      this.state.saveditemswithtotalprice.push(produobj);
    }
  };
  Countavailableproducts(n) {
    for (var i = 1; i <= n; i++) {
      this.state.availableproducts.push(i);
    }
  }

  backproducts = () => {
    var list2 = this.state.saveditems;
    console.log("saved items", this.state.saveditems);
    let factoryproduct = "";
    let ind = 0;
    for (var key in list2) {
      if (ind === list2.length - 1) {
        factoryproduct += list2[key].ID;
      } else {
        factoryproduct += list2[key].ID + ",";
      }
      ind += 1;
    }

    axios
      .put("http://localhost:57260/api/card", {
        UserID: this.props.User,
        ProductFactory: factoryproduct
      })
      .then(result => {})
      .catch(error => {
        this.setState({ response: error.response.data.Message });
      });

    ReactDOM.render(
      <Products
        User={this.props.User}
        name={this.props.name}
        factoryid={this.props.factoryid}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  Handlebuying = () => {
    let Totalproductsprice = 0;
    let list = this.state.saveditemswithtotalprice;
    for (var key in list) {
      Totalproductsprice += list[key].totalprice;
    }
    // console.log("Totalproductsprice", list[0].totalprice);

    var list2 = this.state.saveditems;
    let factoryproduct = "";
    let ind = 0;
    for (var key in list2) {
      if (ind === list2.length - 1) {
        factoryproduct += list2[key].ID;
      } else {
        factoryproduct += list2[key].ID + ",";
      }
      ind += 1;
    }
    console.log("factory product", this.state.saveditems);
    if (factoryproduct !== "") {
      axios
        .put("http://localhost:57260/api/card", {
          UserID: this.props.User,
          ProductFactory: factoryproduct
        })
        .then(result => {})
        .catch(error => {
          this.setState({ response: error.response.data.Message });
        });
    }

    if (this.props.User === undefined && this.state.logged === "no") {
      this.login();
    } else {
      if (this.state.saveditemswithtotalprice.length > 0) {
        ReactDOM.render(
          <FinalBuy
            User={this.props.User}
            name={this.props.name}
            das={this.state.saveditems}
            totalprice={Totalproductsprice}
            factoryid={this.props.factoryid}
            Type={this.props.Type}
            saveditemswithtotalandnum={this.state.saveditemswithtotalprice}
          />,
          document.getElementById("root")
        );
      } else {
        this.setState({ er: "Please select number of items to buy" });
      }
    }
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
        {console.log(
          "test store ",
          this.props.saveditems,
          "current state ",
          this.state.saveditems
        )}
        <button onClick={this.props.getSavedItems}>hit please</button>
        <button
          id="marginbtn"
          onClick={this.backproducts}
          className="btn btn-primary"
        >
          Back to products
        </button>
        <button
          id="marginbtn"
          onClick={this.Handlebuying}
          className="btn btn-primary"
        >
          Continue to buy
        </button>
        <table id="tblProducts">
          <thead>
            <tr id="productthead">
              <td id="producttbodycell">Name</td>
              <td id="producttbodycell">Factory</td>
              <td id="producttbodycell">Image</td>
              <td id="producttbodycell">Number Of Items</td>
            </tr>
          </thead>
          <tbody>
            {this.state.saveditems.map(item => (
              <tr key={item.ID}>
                <td id="producttbodycell">{item.Name}</td>
                <td id="producttbodycell">{item.Factory_Name}</td>
                <td id="producttbodycell">
                  <img
                    id="tblprodimg"
                    src={"data:image/png;base64," + item.Img}
                    alt=""
                  />
                </td>
                <td id="producttbodycell">
                  {this.Countavailableproducts.call(this, item.NumInStock)}
                  <select
                    id="sltoncard"
                    onChange={e => {
                      this.Calculatetotalprice(item.ID, item.Price, e);
                    }}
                  >
                    <option></option>

                    {this.state.availableproducts.map(c => (
                      <option key={c + item.ID}>{c}</option>
                    ))}
                  </select>
                </td>
                {this.Ressetarrayvalues()}
                <td id="producttbodycell">
                  <button
                    onClick={() => this.HandleRemove(item.ID)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div id="er">{this.state.er}</div>
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

const mapStateToProps = state => {
  return {
    saveditems: state.saveditems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSavedItems: () => dispatch(Getsaveditems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOnCard);
