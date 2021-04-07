import React, { Component } from "react";
import "./style.scss";
import { Switch, Select } from "antd";

const { Option } = Select;

export default class Product extends Component {
  state = {
    gifted: false,
    selected: this.props.selected,
    qtd: this.props.qtd ? this.props.qtd : 0,
  };

  change = () => {
    this.props.change(this.props.event_product, this.state);
  };

  handleQtdChange = (e) => {
    let min = 0;
    let max = this.props.product.stock_quantity;

    if (e.target.value <= max && e.target.value > min) {
      this.setState({ qtd: e.target.value });
    } else if (e.target.value > max) {
      this.setState({ qtd: max });
    } else {
      this.setState({ qtd: min });
    }

    this.change();
  };

  render() {
    //console.log(this.props.product);
    return (
      // <li id="product" class="d-flex flex-column align-items-center">
      <li id="product">
        {this.props.product.images[0] !== undefined ? (
          <img src={this.props.product.images[0].src} alt="" />
        ) : (
          <img
            src={require("../../assets/images/woocommerce-placeholder.png")}
            alt="IMAGEM"
          />
        )}
        <p className="text">{this.props.product.name}</p>
        <p className="money">
          R${" "}
          {parseFloat(this.props.product.price).toFixed(2).split(".").join(",")}
        </p>
        {this.props.gifted === false ? (
          <div className="selectContainer">
            <div className="selectButtonContainer">
              <p>ESCOLHER</p>
              <Switch
                checked={this.state.selected}
                onChange={(e) => {
                  this.setState({ selected: e }, () => {
                    this.change();
                  });
                }}
              />
            </div>
            <div className="selectButtonContainer">
              <label htmlFor="qtdeInput">QUANTIDADE</label>
              <input
                id="qtdeInput"
                type="number"
                min="0"
                max={this.props.product.stock_quantity}
                value={this.state.qtd}
                onChange={(e) => {
                  this.handleQtdChange(e);
                }}
              />
            </div>
            {/* <Select
              onChange={(e) => {
                this.setState({ qtd: e }, () => {
                  this.change();
                });
              }}
              defaultValue={this.state.qtd}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
              <Option value={7}>7</Option>
              <Option value={8}>8</Option>
              <Option value={9}>9</Option>
            </Select> */}
          </div>
        ) : null}
      </li>
    );
  }
}
