import React, { Component } from "react";
import "./style.scss";
import { Row, Col } from "antd";
import { HomeOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Link, Switch, Route } from "react-router-dom";
import PersonalClient from "../../../components/client-dashboard/personal";
import EventsGuest from "../../../components/client-dashboard/events";

export default class GuestDashboard extends Component {
  logout = async () => {
    await localStorage.removeItem("user");
    this.props.history.push("/");
  };

  render() {
    return (
      <Row id="guest-dashboard">
        <Col
          span={5}
          className="leftColumn d-flex flex-column align-items-center"
        >
          <img src={require("../../../assets/images/logo-white.png")} />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <Link to={"/guest/personal"}>
                <div
                  className={
                    "link " +
                    (this.props.location.pathname == "/guest/personal"
                      ? "active"
                      : "")
                  }
                >
                  <HomeOutlined className="mr-3" />
                  Dados Pessoais
                </div>
              </Link>
              <Link to={"/guest/events"}>
                <div
                  className={
                    "link " +
                    (this.props.location.pathname == "/guest/events"
                      ? "active"
                      : "")
                  }
                >
                  <ScheduleOutlined className="mr-3" />
                  Eventos
                </div>
              </Link>

              <button class="btn btn-secondary d-flex align-items-center">
                LOJA BELLE MAN{" "}
                <img src={require("../../../assets/images/enter.png")} />
              </button>
            </div>
          </div>
        </Col>
        <Col span={19}>
          <div
            className={
              "exit-row d-flex mt-3 justify-content-between align-items-center ml-3 mr-3"
            }
          >
            <p>PAINEL PRINCIPAL</p>
            <div
              onClick={() => this.logout()}
              className={"d-flex align-items-center exit"}
            >
              <p className={"mr-3"}>SAIR</p>
              {/* <img style={{ width: 20 }} src={require("../../../assets/images/enter-purple.png")} /> */}
            </div>
          </div>
          <Switch>
            <div>
              <Route
                path={`${this.props.match.path}/personal`}
                component={PersonalClient}
              />
              <Route
                path={`${this.props.match.path}/events`}
                component={EventsGuest}
              />
            </div>
          </Switch>
        </Col>
      </Row>
    );
  }
}
