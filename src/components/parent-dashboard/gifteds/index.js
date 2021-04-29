import React, { Component } from "react";
import "./style.scss";
import Product from "../../product";
import { Constants } from "../../../constants";
import axios from "axios";

export default class GiftedsParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifts: [],
    };
    this.get();
  }

  get = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));

    axios
      .get(Constants.ApiUrl + "events/" + this.props.event.id + "/gifteds", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          gifts: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div id="gifts-parent">
        <div className="d-flex flex-column justify-content-center align-items-center title-box">
          <h4>Presentes Recebidos</h4>
        </div>
        <div className="gifts justify-content-center">
          <ul class="d-flex flex-row justify-content-around">
            {this.state.gifts.map((gift) => {
              return <Product gifted={true} product={gift.product} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
