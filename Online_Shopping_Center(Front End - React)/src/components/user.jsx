import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AddUser from "./user_adding";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      response: {}
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

  Add() {
    let ite = { UserName: "", Password: "", Type: "" };

    ReactDOM.render(
      <AddUser type={"Add"} da={ite} />,
      document.getElementById("root")
    );
  }

  Update = ite => {
    ReactDOM.render(
      <AddUser type={"Update"} da={ite} />,
      document.getElementById("root")
    );
  };
  HandleDelete = id => {
    axios.delete("http://localhost:57260/api/user/" + id).then(
      this.setState({
        items: this.state.items.filter(item => item.ID !== id)
      })
    );
  };
  render() {
    return (
      <React.Fragment>
        <button id="btnaddpro" onClick={this.Add}>
          Add User
        </button>
        <table id="tblfactories">
          <thead id="thead">
            <tr>
              <td>User Name</td>
              <td>Password</td>
              <td>Type</td>
              <td>Operations</td>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => (
              <tr key={item.ID}>
                <td id="producttbodycell">{item.UserName}</td>
                <td id="producttbodycell">{item.Password}</td>
                <td id="producttbodycell">{item.Type}</td>
                <td>
                  <button id="btndeletefac" onClick={() => this.Update(item)}>
                    Update
                  </button>
                  <button
                    id="btndeletefac"
                    onClick={() => this.HandleDelete(item.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Users;
