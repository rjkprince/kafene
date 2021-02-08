import React, { Component } from "react";
import classes from "./Order.module.css";
import axios from "axios";
export default class Order extends Component {
  state = {
    orderData: null,
    filters: {
      New: true,
      Packed: true,
      InTransit: true,
      Delivered: true,
    },
  };
  componentDidMount = () => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((res) => {
        this.setState({
          orderData: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
  handleCheckbox = (name) => {
    let prevFilter = { ...this.state.filters };
    prevFilter[name] = !prevFilter[name];
    this.setState({
      filters: {
        ...prevFilter,
      },
    });
  };
  render() {
    const TableRowArr = this.state?.orderData
      ?.filter((order) => {
        let orderStatus = order.orderStatus;
        return this.state.filters[orderStatus];
      })
      .map((order) => {
        return (
          <tr className={classes.TableRow} key={order.id}>
            <td className={classes.SecondaryText}>{order.id}</td>
            <td className={classes.PrimaryText}>{order.customerName}</td>
            <td className={classes.PrimaryText}>
              {order.orderDate}{" "}
              <span
                className={classes.SecondaryText}
                style={{ display: "block" }}
              >
                {order.orderTime}
              </span>{" "}
            </td>
            <td className={classes.SecondaryText}>$ {order.amount}</td>
            <td className={classes.PrimaryText}>{order.orderStatus}</td>
          </tr>
        );
      });
    return (
      <div className={classes.Orders}>
        <h1 style={{ margin: "0" }}>Orders</h1>
        <div className={classes.OrdersWrap}>
          <div className={classes.FilterWrap}>
            <h3>Filters</h3>
            <div className={classes.FilterOption}>
              <p>Count: {TableRowArr?.length}</p>
              <label className={classes.FilterCheckbox}>
                <input
                  type="checkbox"
                  name="New"
                  checked={this.state.filters?.New}
                  onClick={() => this.handleCheckbox("New")}
                />
                New
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  type="checkbox"
                  name="Packed"
                  checked={this.state.filters?.Packed}
                  onClick={() => this.handleCheckbox("Packed")}
                />
                Packed
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  type="checkbox"
                  name="InTransit"
                  checked={this.state.filters?.InTransit}
                  onClick={() => this.handleCheckbox("InTransit")}
                />
                In Transit
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  type="checkbox"
                  name="Delivered"
                  checked={this.state.filters?.Delivered}
                  onClick={() => this.handleCheckbox("Delivered")}
                />
                Delivered
              </label>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <table className={classes.OrderTable}>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              <tbody>{TableRowArr}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
