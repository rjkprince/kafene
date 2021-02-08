import React, { Component } from "react";
import axios from "axios";
import classes from "./User.module.css";
export default class User extends Component {
  state = {
    orderData: null,
    searchQuery: null,
  };
  componentDidMount = () => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((res) => {
        this.setState({
          orderData: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  handleSearch = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      e.preventDefault();
      if (e.target.value.length < 2) {
        alert("please enter at least 2 characters");
        this.setState({
          searchQuery: null,
        });
        return;
      }
      this.setState({
        searchQuery: e.target.value,
      });
    }
  };

  render() {
    const TableRowArr = this.state?.orderData
      ?.filter((order) => {
        if (!this.state.searchQuery) return true;
        let fullName = order.fullName.toLowerCase();
        let searchQuery = this.state.searchQuery.toLowerCase();
        return fullName.includes(searchQuery);
      })
      .map((order) => {
        return (
          <tr className={classes.TableRow} key={order.id}>
            <td className={classes.SecondaryText}>{order.id}</td>
            <td className={classes.PrimaryText}>
              <img src={order.profilePic} alt={order.fullName} />
            </td>
            <td className={classes.SecondaryText}>{order.fullName}</td>
            <td className={classes.PrimaryText}>{order.dob}</td>
            <td className={classes.SecondaryText}>{order.gender}</td>
            <td className={classes.SecondaryText}>
              {order.currentCity + ", " + order.currentCountry}
            </td>
          </tr>
        );
      });
    return (
      <div className={classes.Orders}>
        <h1 style={{ margin: "0" }}>Users</h1>
        <div className={classes.OrdersWrap}>
          <form className={classes.FilterWrap}>
            <input
              type="search"
              placeholder="Search by Name"
              className={classes.SearchBox}
              onKeyDown={(e) => this.handleSearch(e)}
            />
            <input type="reset" value="Reset" className={classes.Button} />
          </form>
          <div style={{ width: "100%" }}>
            <table className={classes.OrderTable}>
              <tr>
                <th>ID</th>
                <th>User Avatar</th>
                <th>Full Name</th>
                <th>DoB</th>
                <th>Gender</th>
                <th>Current Location</th>
              </tr>
              <tbody>{TableRowArr}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
