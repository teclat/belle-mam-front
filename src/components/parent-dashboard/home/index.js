import React, { Component } from "react";
import "./style.scss";
import { Col, Row, Modal } from "antd";
import {
  Twitter,
  Whatsapp,
  Telegram,
  Facebook,
  Mail,
} from "react-social-sharing";
import { ShareAltOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Constants } from "../../../constants";
import axios from "axios";
export default class HomeParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: {},
      user_name: "",
      showSocialModal: false,
    };
    this.get();
  }

  toogleSocialModal = (bool) => {
    this.setState({ showSocialModal: bool });
  };

  get = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    this.setState({ user_name: user.userName });

    axios
      .get(Constants.ApiUrl + "events/" + this.props.event.id + "/dashboard", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          dashboard: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let url = "https://belle-mam.herokuapp.com/convite/" + this.props.event.url;
    return (
      <Col id="home-parent">
        <Modal
          title="Compartilhar em..."
          visible={this.state.showSocialModal}
          onOk={() => this.toogleSocialModal(false)}
          onCancel={() => this.toogleSocialModal(false)}
        >
          <Twitter message={this.props.event.invite_text} link={url} />
          <Whatsapp message={this.props.event.invite_text} link={url} />
          <Telegram message={this.props.event.invite_text} link={url} />
          <Facebook message={this.props.event.invite_text} link={url} />
          <Mail
            subject="Convidando você!"
            body={this.props.event.invite_text + url}
          />
        </Modal>
        <Row className="p-3 mt-5 mb-5 d-flex">
          <div className="d-flex flex-column justify-content-center align-items-center title-box">
            <div className="d-flex">
              <h2>Olá, {this.state.user_name}!</h2>
              <img src={require("../../../assets/images/purple-heart.png")} />
            </div>
          </div>
          {this.state.dashboard.difference ? (
            this.state.dashboard.difference >= 0 ? (
              <h3>
                {" "}
                FALTAM <span>
                  {"0" + this.state.dashboard.difference}
                </span> DIAS{" "}
              </h3>
            ) : (
              <h3> JÁ PASSOU </h3>
            )
          ) : null}
          {}
        </Row>
        <Row align="stretch">
          <Col className="d-flex" span={12}>
            <div className="box ml-3 mr-3" style={{ width: "100%" }}>
              <h5 className="mb-4">Último recebido</h5>
              <Row align="stretch">
                {this.state.dashboard && this.state.dashboard.lastProduct ? (
                  <>
                    <Col span={12}>
                      <img
                        className="product-img"
                        src={this.state.dashboard.lastProduct.image_url}
                      />
                    </Col>

                    <Col
                      className="d-flex flex-column justify-content-around"
                      span={12}
                    >
                      <h5>{this.state.dashboard.lastProduct.name}</h5>
                      <h5>
                        R$ <span>{this.state.dashboard.lastProduct.price}</span>
                      </h5>
                      <Link to={"/parents/gifteds"}>
                        <button className="btn btn-primary">VER TODOS</button>
                      </Link>
                    </Col>
                  </>
                ) : null}
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <Row className="box last-note mr-3 mb-3 d-flex flex-column">
              <Row className="mb-3">
                <h5>Último recado</h5>
                <Link to={"/parents/notes"}>
                  <button className="btn btn-primary small">VER TODOS</button>
                </Link>
              </Row>
              <Row>
                {this.state.dashboard && this.state.dashboard.lastNote ? (
                  <>
                    <Col span={6} class="note-img mr-5">
                      <img src={this.state.dashboard.lastNote.user.image_url} />
                    </Col>
                    <Col span={18}>
                      <p>{this.state.dashboard.lastNote.text}</p>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Row>
            <Row align="stretch">
              <Col className="d-flex" span={13}>
                <div className="box mr-3 text-center d-flex flex-column align-items-center justify-content-center">
                  <h5>Total de Presentes</h5>
                  <h5 className="money">
                    R${" "}
                    <span>
                      {this.state.dashboard &&
                      this.state.dashboard.gifteds &&
                      this.state.dashboard.gifteds.total
                        ? this.state.dashboard.gifteds.total
                        : 0}
                    </span>
                  </h5>
                  <Link to={"/parents/gifteds"}>
                    <button className="btn btn-primary small">VER TODOS</button>
                  </Link>
                </div>
              </Col>
              <Col className="d-flex" span={11}>
                <div
                  style={{ width: "100%" }}
                  className="box text-center mr-3 d-flex flex-column align-items-center justify-content-center"
                >
                  <h5>Qtd. presentes</h5>
                  <h5 className="money">
                    <span>
                      {this.state.dashboard &&
                      this.state.dashboard.gifteds &&
                      this.state.dashboard.gifteds.qtd
                        ? this.state.dashboard.gifteds.qtd
                        : 0}
                    </span>
                  </h5>
                  <Link to={"/parents/gifteds"}>
                    <button className="btn btn-primary small">VER TODOS</button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="space-between" className="p-3 mt-3">
          <button
            onClick={() => this.toogleSocialModal(true)}
            className="btn btn-primary"
          >
            <ShareAltOutlined className="mr-3" />
            COMPARTILHAR EVENTO
          </button>
          <a
            target={"_blank"}
            href="https://api.whatsapp.com/send?phone='5585981768451'&text=%20Oi, tudo bem. Pode me ajudar?%20"
            className="btn btn-secondary"
          >
            SAC
            <WhatsAppOutlined className="ml-3" />
          </a>
        </Row>
      </Col>
    );
  }
}
