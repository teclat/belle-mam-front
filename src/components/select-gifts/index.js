import React, { Component } from "react";
import "./style.scss";
import Product from "../product";
import { Constants } from "../../constants";
import axios from "axios";
import { Button } from "antd";
export default class SelectGifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      products: [],
      selecteds: [],
      isLoading: false,
      hasMorePages: true,
    };
    this.get();
  }

  get = async () => {
    console.log(this.state.isLoading);
    this.setState({
      isLoading: true,
    });

    let user = await JSON.parse(await localStorage.getItem("user"));
    console.log("user", user);

    axios
      .get(Constants.ApiUrl + "products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },

        params: {
          page: this.state.page,
          per_page: 8,
        },
      })
      .then((response) => {
        let pageLimit = response.headers["x-wp-totalpages"];
        if (pageLimit <= this.state.page) {
          this.setState({
            hasMorePages: false,
          });
          console.log("End of products list.");
          console.log(this.state.hasMorePages);
        }

        console.log(pageLimit);

        this.setState({
          products: [...this.state.products, ...response.data],
        });

        console.log("PRODUCTS", this.state.products);

        this.setState({ page: this.state.page + 1 });

        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      });
  };

  change = (id, values) => {
    console.log(values);
    let selecteds = this.state.selecteds;
    let exist = false;
    if (selecteds.length > 0) {
      let product = selecteds.filter((p) => p.product_id == id)[0];
      if (product) {
        exist = true;
        if (values.selected == true) {
          product.quantity = values.qtd;
        } else {
          var index = selecteds
            .map((p) => {
              return p.product_id;
            })
            .indexOf(id);
          selecteds.splice(index, 1);
        }
      }
    }

    if (!exist) {
      if (values.selected == true) {
        selecteds.push({
          product_id: id,
          quantity: values.qtd,
        });
      }
    }
    console.log("pppp", selecteds);
    this.setState({ selecteds: selecteds });
  };

  render() {
    return (
      <div id="select-gifts">
        <div className="d-flex flex-column justify-content-center align-items-center title-box">
          <div className="d-flex">
            <h2>Falta pouco!</h2>
            <img src={require("../../assets/images/purple-heart.png")} />
          </div>
          <h4>Vamos escolher os produtos do seu evento</h4>
        </div>
        <div className="gifts">
          {/* <ul class="d-flex flex-row justify-content-around"> */}
          <ul>
            {this.state.products.map((product) => {
              return (
                <Product
                  event_product={product.id}
                  change={this.change}
                  gifted={false}
                  product={product}
                />
              );
            })}
          </ul>
        </div>
        {/* <div className="d-flex btns justify-content-around"> */}
        <div className="btnsContainer">
          {this.state.hasMorePages === true ? (
            <Button
              loading={this.state.isLoading}
              onClick={() => {
                this.get();
              }}
              className="btn btn-secondary"
            >
              MAIS PRODUTOS
            </Button>
          ) : null}
          <Button
            loading={this.props.isLoading}
            onClick={() => {
              this.props.save(this.state.selecteds);
            }}
            className="btn btn-secondary"
          >
            FINALIZAR
          </Button>
        </div>
      </div>
    );
  }
}
