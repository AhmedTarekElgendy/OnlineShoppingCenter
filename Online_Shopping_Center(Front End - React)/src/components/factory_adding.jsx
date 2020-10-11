import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Factories from "./factory";
import Login from "./logIn";
import AddUser from "./user_adding";
import Home from "./home";
import img from "./images/logo.png";
import img1 from "./images/newitem.jpg";
import img2 from "./images/Edititem.jpg";

class AddFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "", // this.props.da.Name,
      Description: "", // this.props.da.Description,
      response: {},
      imgsrc: ""
    };
  }

  Checkforimageaddorupdate = () => {
    if (this.props.type === "Add") {
      return <img src={img1} id="imgfactback" />;
    } else {
      return <img src={img2} id="imgeditfactitem" />;
    }
  };

  Submit = event => {
    event.preventDefault();
  };

  HandleAdd = () => {
    if (this.props.type === "Add") {
      axios
        .post("http://localhost:57260/api/factory", {
          Name: this.state.Name,
          Description: this.state.Description,
          Img: this.state.img
        })
        .then(result => {
          if (result.data.ID) {
            ReactDOM.render(
              <Factories
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
        .put("http://localhost:57260/api/factory", {
          ID: this.props.da.ID,
          Name: this.state.Name,
          Description: this.state.Description,
          Img: this.state.img
        })
        .then(result => {
          ReactDOM.render(
            <Factories
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
  handleback() {
    ReactDOM.render(
      <Factories
        User={this.props.User}
        name={this.props.name}
        Type={this.props.Type}
      />,
      document.getElementById("root")
    );
  }

  HandleName = event => {
    this.setState({ Name: event.target.value });
  };

  handleDescription = event => {
    this.setState({ Description: event.target.value });
  };

  Handleimg = event => {
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
        <form onSubmit={this.Submit} id="factorycontainer">
          <input
            id="innamefac"
            type="text"
            placeholder="Name"
            onChange={this.HandleName}
            className="form-control form-control"
            value={this.state.Name}
          ></input>
          {this.Checkforimageaddorupdate()}

          <br />
          <textarea
            id="indscfac"
            placeholder="Description"
            onChange={this.handleDescription}
            className="form-control form-control"
            value={this.state.Description}
          ></textarea>
          <br />

          <input type="file" onChange={e => this.Handleimg(e)} id="imgbtn" />

          <img src={"data:image/png;base64," + this.state.img} id="imgfact" />
          <br />
          <br />
          <button
            id="btnaddfact"
            onClick={this.HandleAdd}
            className="btn btn-primary"
          >
            {this.props.type}
          </button>
          <button
            id="btnadd"
            onClick={this.handleback}
            className="btn btn-dark"
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

export default AddFactory;
