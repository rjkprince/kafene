import React, { Component } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
export default class Header extends Component {
  state = {
    nav: "/orders",
  };

  componentDidMount = () => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      this.setState({
        nav: "/orders",
      });
    } else {
      this.setState({
        nav: pathname,
      });
    }

    if (!this.props.login) this.setState({ nav: "/login" });
  };

  handleNavChange = (pathname) => {
    if (!this.props.login) return;
    this.setState({
      nav: pathname,
    });
  };

  render() {
    return (
      <div className={classes.Header}>
        <section>
          <div className={classes.Logo}>
            <img
              src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
              alt="brand"
            />
            <p>Kafene</p>
          </div>
          <nav>
            <Link
              to="/orders"
              className={this.state.nav === "/orders" ? classes.Active : null}
              onClick={() => this.handleNavChange("/orders")}
            >
              Orders
            </Link>
            <Link
              to="/products"
              className={this.state.nav === "/products" ? classes.Active : null}
              onClick={() => this.handleNavChange("/products")}
            >
              Products
            </Link>
            <Link
              to="/users"
              className={this.state.nav === "/users" ? classes.Active : null}
              onClick={() => this.handleNavChange("/users")}
            >
              Users
            </Link>
          </nav>
        </section>
        {this.props.login ? (
          <a
            onClick={() => this.props.setLogin(false)}
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        ) : (
          <Link to="/login" onClick={() => this.handleNavChange("/login")}>
            Login
          </Link>
        )}
      </div>
    );
  }
}
