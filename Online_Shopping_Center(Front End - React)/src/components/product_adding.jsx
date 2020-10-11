import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Products from "./product";
import Home from "./home";
import Login from "./logIn";
import AddUser from "./user_adding";
import img from "./images/logo.png";
import img1 from "./images/newitem.jpg";
import img2 from "./images/Edititem.jpg";
import AddFactory from "./factory_adding";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      Name: this.props.da.Name,
      NumberInStock: this.props.da.NumInStock,
      FactoryID: this.props.da.Factory,
      FactID: this.props.da.FactID,
      Price: this.props.da.Price,
      response: {},
      filteritem: {},
      img: this.props.da.Img,
      imgsrc: ""
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
  handleaddfactory = () => {
    let it = {
      Name: "",
      Description: ""
    };

    ReactDOM.render(
      <AddFactory
        User={this.props.User}
        name={this.props.name}
        type={"Add"}
        da={it}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  Checkforimageaddorupdate = () => {
    if (this.props.type === "Add") {
      return <img src={img1} id="imgprodback" />;
    } else {
      return <img src={img2} id="imgedititem" />;
    }
  };

  handleChange = event => {
    this.setState({ FactID: event.target.value });
  };

  handleformsubmit(event) {
    event.preventDefault();
  }

  handlename = event => {
    this.setState({ Name: event.target.value });
  };

  handleNIS = event => {
    this.setState({ NumberInStock: event.target.value });
  };

  handleprice = event => {
    this.setState({ Price: event.target.value });
  };
  handleback = () => {
    ReactDOM.render(
      <Products
        User={this.props.User}
        name={this.props.name}
        factoryid={1}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  };

  HandleImg = event => {
    let files = event.target.files;
    let reader = new FileReader();
    let ms = reader.readAsDataURL(files[0]);
    reader.onload = e => {
      let slicestart = e.target.result.search(",");
      this.setState({
        img: e.target.result.slice(slicestart + 1),
        imgsrc: reader.result
      });
    };
  };

  HandleAdd = () => {
    if (this.props.type === "Add") {
      axios
        .post("http://localhost:57260/api/product", {
          Name: this.state.Name,
          NumInStock: this.state.NumberInStock,
          Factory_ID: this.state.FactID,
          Img: this.state.img,
          Price: this.state.Price
        })
        .then(result => {
          if (result.data.ID) {
            ReactDOM.render(
              <Home
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
    } else {
      axios
        .put("http://localhost:57260/api/product", {
          ID: this.props.da.ID,
          Name: this.state.Name,
          NumInStock: this.state.NumberInStock,
          Factory_ID: this.state.FactID,
          Img: this.state.img,
          Price: this.state.Price
        })
        .then(result => {
          ReactDOM.render(
            <Home
              User={this.props.User}
              name={this.props.name}
              Type={this.props.Type}
            />,
            document.getElementById("root")
          );
        })
        .catch(error => {
          this.setState({ response: error.response.data.Message });
        });
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

  handlehome() {
    ReactDOM.render(
      <Home
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  }

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
        <form onSubmit={this.handleformsubmit} id="productcontainer">
          <input
            type="text"
            id="inp"
            onChange={this.handlename}
            value={this.state.Name}
            placeholder="Name"
            className="form-control form-control"
          ></input>
          <input
            type="text"
            id="inp"
            onChange={this.handleprice}
            value={this.state.Price}
            placeholder="Price (EGP)"
            className="form-control form-control"
          ></input>
          <br></br>
          <input
            type="text"
            id="inp2"
            onChange={this.handleNIS}
            value={this.state.NumberInStock}
            placeholder="Number in stock"
            className="form-control form-control"
          ></input>
          {this.Checkforimageaddorupdate()}
          <br></br>
          <select
            id="slt"
            placeholder="Factories"
            onChange={this.handleChange}
            className="form-control form-control"
          >
            <option selected="selected">Select Your Factory</option>
            {this.state.items
              .filter(ite => ite.Name !== this.state.FactoryID)
              .map(item => (
                <option key={item.ID} value={item.ID}>
                  {item.Name}
                </option>
              ))}
          </select>
          <button
            id="btnaddfactory"
            className="btn btn-primary"
            onClick={this.handleaddfactory}
          >
            New Factory
          </button>
          <br />
          <br />
          <input type="file" onChange={e => this.HandleImg(e)} id="imgbtn" />
          <img src={"data:image/png;base64," + this.state.img} id="imgfact" />
          <br />
          <button
            id="btnaddproduct"
            className="btn btn-primary"
            onClick={this.HandleAdd}
          >
            {this.props.type}
          </button>
          <button
            id="btnbackproduct"
            className="btn btn-dark"
            onClick={this.handleback}
          >
            Back
          </button>
          <br />
          <div id="error">{JSON.stringify(this.state.response)}</div>
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

export default AddProduct;
