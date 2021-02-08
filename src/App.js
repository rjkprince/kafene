import React, { Component } from "react";
import Header from "./components/Header/Header";
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  Switch,
} from "react-router-dom";
import Order from "./components/Order/Order";
import Product from "./components/Product/Product";
import User from "./components/User/User";
import Login from "./components/Login/Login";
export default class App extends Component {
  state = {
    login: JSON.parse(localStorage.getItem("login")) || false,
  };

  setLogin = (bool) => {
    localStorage.setItem("login", bool);
    this.setState({
      login: bool,
    });
  };
  render() {
    if (!this.state.login)
      return (
        <React.Fragment>
          <Header login={this.state.login} setLogin={this.setLogin} />
          <Route
            path="/"
            render={(routerProps) => (
              <Login
                setLogin={this.setLogin}
                login={this.state.login}
                {...routerProps}
              />
            )}
          />
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <Header login={this.state.login} setLogin={this.setLogin} />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/orders" />} />
          <Route
            path="/login"
            render={(routerProps) => (
              <Login
                setLogin={this.setLogin}
                login={this.state.login}
                {...routerProps}
              />
            )}
          />
          <Route path="/orders" component={Order} />
          <Route path="/products" component={Product} />
          <Route path="/users" component={User} />
        </Switch>
      </React.Fragment>
    );
  }
}
