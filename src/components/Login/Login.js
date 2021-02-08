import React, { Component } from "react";
import classes from "./Login.module.css";
import axios from "axios";
export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.username &&
      this.state.password &&
      this.state.username === this.state.password
    ) {
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      axios
        .post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", data)
        .then((res) => {
          alert("Login Successful");
          this.props.setLogin(true);
          this.props.history.replace("/orders");
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("Please enter valid credentials!");
  };

  componentDidMount = () => {
    console.log(this.props.login);
    if (this.props.login) this.props.history.replace("/orders");
  };
  render() {
    return (
      <div className={classes.Wrapper}>
        <div className={classes.Login}>
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="Enter username"
            className={classes.InputField}
            onChange={(e) => this.handleUsername(e)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className={classes.InputField}
            onChange={(e) => this.handlePassword(e)}
          />
          <input
            type="submit"
            value="Login"
            className={classes.Btn}
            onClick={(e) => this.handleSubmit(e)}
          />
        </div>
      </div>
    );
  }
}
