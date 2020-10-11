import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import AddProduct from "./product_adding";
import ProductOnCard from "./oncardproducts";
import Home from "./home";
import Login from "./logIn";
import AddUser from "./user_adding";
import img from "./images/logo.png";
import { Provider } from "react-redux";
import store from "../redux/store";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      oncarditems: [],
      logged: "no",
      totalprice: 0.0,
      checkforcarddata: [],
      productfact: ""
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
      .get("http://localhost:57260/api/card/" + this.props.User)
      .then(result => result.data)
      .then(response => this.setState({ checkforcarddata: response }))
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:57260/api/card/productsfact?id=" + this.props.User)
      .then(result => result.data)
      .then(response => this.setState({ productfact: response }))
      .catch(error => {
        console.log(error);
      });

    if (this.props.User !== undefined) {
      this.setState({ logged: "yes" });
    }
  }

  SetOncardItemsArraywitholditems = () => {
    if (
      this.state.checkforcarddata.length > 0 &&
      this.state.oncarditems.length === 0
    ) {
      var li = this.state.checkforcarddata;
      for (var key in li) {
        this.state.oncarditems.push(li[key]);
      }
    }
  };

  Add = () => {
    if (this.props.User === undefined && this.state.logged === "no") {
      this.login();
    } else {
      let d = {
        Name: "",
        Price: 0.0,
        NumInStock: "",
        Factory: "",
        FactID: ""
      };
      ReactDOM.render(
        <AddProduct
          type={"Add"}
          da={d}
          User={this.props.User}
          name={this.props.name}
          Type={this.props.Type}
        />,
        document.getElementById("root")
      );
    }
  };

  Update = ite => {
    ReactDOM.render(
      <AddProduct
        type={"Update"}
        da={ite}
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  HandleDelete = ID => {
    axios.delete("http://localhost:57260/api/product" + "/" + ID).then(
      this.setState({
        items: this.state.items.filter(item => item.ID !== ID)
      })
    );
  };

  Handlebuying = ite => {
    this.setState({ totalprice: this.state.totalprice + ite.Price });
    ite.NumInStock = ite.NumInStock - 1;

    var objj = this.state.checkforcarddata.filter(it => it.ID === ite.ID);

    if (objj.length === 0) {
      this.state.oncarditems.push(ite);
    }
  };

  DisplayoncardItems = () => {
    if (this.state.checkforcarddata.length > 0) {
      let factoryproduct = "";
      let list = this.state.oncarditems;
      let ind = 0;
      for (var key in list) {
        if (ind === list.length - 1) {
          factoryproduct += list[key].ID;
        } else {
          factoryproduct += list[key].ID + ",";
        }

        ind += 1;
      }

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
      //update card
    } else {
      //post card
      let factoryproduct = "";
      let list = this.state.oncarditems;
      let ind = 0;
      for (var key in list) {
        if (ind === list.length - 1) {
          factoryproduct += list[key].ID;
        } else {
          factoryproduct += list[key].ID + ",";
        }
        ind += 1;
      }
      console.log("factory product", factoryproduct);

      if (factoryproduct !== "") {
        axios
          .post("http://localhost:57260/api/card", {
            UserID: this.props.User,
            ProductFactory: factoryproduct
          })
          .then(result => {})
          .catch(error => {
            this.setState({ response: error.response.data.Message });
          });
      }
    }
    ReactDOM.render(
      <ProductOnCard
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
        factoryid={this.props.factoryid}
        store={store}
      />,
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

  HandleOutOfStock(n, item) {
    if (n !== 0) {
      return (
        <button
          id="Addtocard"
          className="btn btn-success"
          onClick={() => this.Handlebuying(item)}
        >
          Add to card
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-success"
          onClick={() => this.Handlebuying(item)}
          disabled={true}
        >
          Add to card
        </button>
      );
    }
  }

  HandleAddproductforuser = () => {
    if (this.props.Type === "Admin") {
      return (
        <button id="btnaddpro" className="btn btn-primary" onClick={this.Add}>
          Add Product
        </button>
      );
    }
  };

  Handleoperationcolumnforuser = () => {
    if (this.props.Type === "Admin") {
      return <td id="producttbodycell">Operations</td>;
    }
  };

  Handleoperationbuttonsforuser = item => {
    if (this.props.Type === "Admin") {
      return (
        <td id="producttbodycelloperations">
          {" "}
          <button
            id="btndeletepro"
            className="btn btn-danger"
            onClick={() => this.HandleDelete(item.ID)}
          >
            Delete
          </button>
          <button
            id="btnupdatepro"
            className="btn btn-primary"
            onClick={() => this.Update(item)}
          >
            Update
          </button>
        </td>
      );
    }
  };

  render() {
    return (
      <div>
        {this.Notlogged()}
        {this.SetOncardItemsArraywitholditems()}
        {this.HandleAddproductforuser()}
        <button
          id="btnaddpro"
          className="btn btn-info"
          onClick={this.DisplayoncardItems}
        >
          Items On Card
        </button>
        <table id="tblProducts">
          <thead>
            <tr id="productthead">
              <td id="producttbodycell">Name</td>
              <td id="producttbodycell">Price</td>
              <td id="producttbodycell">Number In Storage</td>
              <td id="producttbodycell">Factory</td>
              <td id="producttbodycell">Image</td>
              {this.Handleoperationcolumnforuser()}
            </tr>
          </thead>
          <tbody>
            {this.state.items
              .filter(ite => ite.FactID === this.props.factoryid)
              .map(item => (
                <tr key={item.ID} id="producttbody">
                  <td id="producttbodycell">{item.Name}</td>
                  <td id="producttbodycell">{item.Price}</td>
                  <td id="producttbodycell">{item.NumInStock}</td>
                  <td id="producttbodycell">{item.Factory}</td>
                  <td id="producttbodycell">
                    <img
                      id="tblprodimg"
                      src={"data:image/png;base64," + item.Img}
                      alt=""
                    />
                  </td>
                  {this.Handleoperationbuttonsforuser(item)}

                  <td id="producttbodycellAddtocard">
                    {this.HandleOutOfStock(item.NumInStock, item)}
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

export default Products;
