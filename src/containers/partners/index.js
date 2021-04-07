import React, { Component } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style.scss";
import { Row } from "antd";

function Partners(props) {
  return (
    <div id="partners">
      <Header purple={true} />
      <div className="partners-box d-flex flex-column align-items-center">
        <div className="title text-center">
          <h2 className="text-center">
            Conheça quem <span>acredita</span> <br />
            no nosso trabalho
          </h2>
          <img src={require("../../assets/images/purple-heart.png")} alt="" />
        </div>
        <div className="box">
          <Row justify="center">
            <img
              src={require("../../assets/images/partners/medela.png")}
              alt=""
            />
            <img
              src={require("../../assets/images/partners/club.png")}
              alt=""
            />
            <img
              src={require("../../assets/images/partners/bebesecologicos.png")}
              alt=""
            />
          </Row>
          <Row justify="center">
            <img
              src={require("../../assets/images/partners/rihappy.png")}
              alt=""
            />
            <img
              src={require("../../assets/images/partners/prupe.png")}
              alt=""
            />
            <img
              src={require("../../assets/images/partners/purachuva.png")}
              alt=""
            />
          </Row>
          <Row justify="center">
            <img
              src={require("../../assets/images/partners/portbaby.png")}
              alt=""
            />
            <img
              src={require("../../assets/images/partners/babytub.png")}
              alt=""
            />
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Partners;
