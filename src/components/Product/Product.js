import React, { Component } from "react";
import axios from "axios";
import classes from "./Product.module.css";

export default class Product extends Component {
  state = {
    orderData: null,
    filters: {
      Expired: true,
      LowStock: true,
    },
  };
  componentDidMount = () => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
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
        let showExpired = this.state.filters.Expired;
        let showLowStock = this.state.filters.LowStock;
        if (!showExpired) {
          let currYear = new Date().getFullYear();
          let currMonth = new Date().getMonth();
          let currDate = new Date().getDate();
          let checkMonth = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
          };
          let expiryDate = order.expiryDate;
          expiryDate = expiryDate.split("-");
          if (currYear > expiryDate[2]) return false;
          if (currYear == expiryDate[2])
            if (currMonth > checkMonth[expiryDate[1]]) return false;
          if (currMonth == checkMonth[expiryDate[1]])
            if (currDate > expiryDate[0]) return false;
        }
        if (!showLowStock) {
          let stock = order.stock;
          if (stock < 100) return false;
        }
        return true;
      })
      .map((order) => {
        return (
          <tr className={classes.TableRow} key={order.id}>
            <td className={classes.SecondaryText}>{order.id}</td>
            <td className={classes.PrimaryText}>{order.medicineName}</td>
            <td className={classes.SecondaryText}>{order.medicineBrand}</td>
            <td className={classes.PrimaryText} style={{ minWidth: "100px" }}>
              {order.expiryDate}
            </td>
            <td className={classes.SecondaryText} style={{ minWidth: "100px" }}>
              $ {order.unitPrice}
            </td>
            <td className={classes.SecondaryText}>{order.stock}</td>
          </tr>
        );
      });
    return (
      <div className={classes.Orders}>
        <h1 style={{ margin: "0" }}>Products</h1>
        <div className={classes.OrdersWrap}>
          <div className={classes.FilterWrap}>
            <h3>Filters</h3>
            <div className={classes.FilterOption}>
              <p>Count: {TableRowArr?.length}</p>
              <label className={classes.FilterCheckbox}>
                <input
                  type="checkbox"
                  name="Expired"
                  checked={this.state.filters?.Expired}
                  onClick={() => this.handleCheckbox("Expired")}
                />
                Expired
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  type="checkbox"
                  name="LowStock"
                  checked={this.state.filters?.LowStock}
                  onClick={() => this.handleCheckbox("LowStock")}
                />
                LowStock
              </label>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <table className={classes.OrderTable}>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
              <tbody>{TableRowArr}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
