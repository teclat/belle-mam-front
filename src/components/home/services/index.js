import React, { Component } from "react";
import "./style.scss";

export default class Services extends Component {
  state = {
    clicked: "stroller",
  };

  render() {
    return (
      <section id="services" class="container-fluid pt-7">
        {/* <div class="service-back d-flex justify-content-center">
          <img
            src={require("../../../assets/images/service-back-line.png")}
            alt=""
          />
        </div> */}
        <ul class="d-flex justify-content-around">
          <li>
            <p class="text-center">CHÁ REVELAÇÃO</p>
            <img
              id="ballon"
              onClick={() => {
                this.setState({ clicked: "ballon" });
                this.props.setService(0);
              }}
              class={
                "clickable-service " +
                (this.state.clicked === "ballon" ? "clicked" : "")
              }
              src={require("../../../assets/images/baloon.png")}
              alt=""
            />
          </li>
          <li>
            <p class="text-center">CHÁ DE FRALDA</p>
            <img
              id="diaper"
              onClick={() => {
                this.setState({ clicked: "diaper" });
                this.props.setService(1);
              }}
              class={
                "clickable-service " +
                (this.state.clicked === "diaper" ? "clicked" : "")
              }
              src={require("../../../assets/images/diaper.png")}
              alt=""
            />
          </li>
          <li>
            <p class="text-center">CHÁ DE BEBÊ</p>
            <img
              id="stroller"
              onClick={() => {
                this.setState({ clicked: "stroller" });
                this.props.setService(2);
              }}
              class={
                "clickable-service " +
                (this.state.clicked === "stroller" ? "clicked" : "")
              }
              src={require("../../../assets/images/stroller.png")}
              alt=""
            />
          </li>
          <li>
            <p class="text-center">BATIZADOS</p>
            <img
              id="drop"
              onClick={() => {
                this.setState({ clicked: "drop" });
                this.props.setService(3);
              }}
              class={
                "clickable-service " +
                (this.state.clicked === "drop" ? "clicked" : "")
              }
              src={require("../../../assets/images/drop.png")}
              alt=""
            />
          </li>
          <li>
            <p class="text-center">ANIVERSÁRIOS</p>
            <img
              id="cake"
              onClick={() => {
                this.setState({ clicked: "cake" });
                this.props.setService(4);
              }}
              class={
                "clickable-service " +
                (this.state.clicked === "cake" ? "clicked" : "")
              }
              src={require("../../../assets/images/cake.png")}
              alt=""
            />
          </li>
        </ul>
      </section>
    );
  }
}
