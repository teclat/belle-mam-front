import React, { Component } from "react";
import "./style.scss";
import { Row, Col } from "antd";
import { HomeOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import PersonalClient from "../../../components/client-dashboard/personal";
import EventsGuest from "../../../components/client-dashboard/events";
import GuestGiftList from "../../../components/client-dashboard/gift-list";

function GuestDashboard(props) {
  const history = useHistory();
  const logout = async () => {
    await localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <Row id="guest-dashboard">
      <input
        type="checkbox"
        className="guest-menu-toggle"
        id="guest-menu-toggle"
      />
      <label htmlFor="guest-menu-toggle" className="guest-menu-toggle-label">
        <span></span>
      </label>
      <Col
        span={5}
        className="leftColumn d-flex flex-column align-items-center"
      >
        <img src={require("../../../assets/images/logo-white.png")} alt="" />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <Link to={"/guest/personal"}>
              <div
                className={
                  "link " +
                  (props.location.pathname === "/guest/personal"
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
                  (props.location.pathname === "/guest/events" ? "active" : "")
                }
              >
                <ScheduleOutlined className="mr-3" />
                Eventos
              </div>
            </Link>

            <button className="btn btn-secondary d-flex align-items-center">
              LOJA BELLE MAN{" "}
              <img src={require("../../../assets/images/enter.png")} alt="" />
            </button>
          </div>
        </div>
      </Col>
      <Col span={19} className="main-section">
        <div
          className={
            "exit-row d-flex mt-3 justify-content-between align-items-center ml-3 mr-3 guest-header-container"
          }
        >
          <p>PAINEL PRINCIPAL</p>
          <div
            onClick={() => logout()}
            className={"d-flex align-items-center exit"}
          >
            <p className={"mr-3"}>SAIR</p>
            {/* <img style={{ width: 20 }} src={require("../../../assets/images/enter-purple.png")} /> */}
          </div>
        </div>
        <Switch>
          <div>
            <Route
              path={`${props.match.path}/personal`}
              component={PersonalClient}
            />
            <Route
              path={`${props.match.path}/events`}
              component={EventsGuest}
            />
            <Route
              path={`${props.match.path}/event/:eventUrl/`}
              component={GuestGiftList}
            />
          </div>
        </Switch>
      </Col>
    </Row>
  );
}

export default GuestDashboard;
