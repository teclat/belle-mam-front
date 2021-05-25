import React, { Component, useState } from "react";
import "./style.scss";
import { Row, Col, Button } from "antd";
import HomeParent from "../../../components/parent-dashboard/home";
import {
  HomeOutlined,
  SettingFilled,
  GiftFilled,
  PictureOutlined,
  UserOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { Constants } from "../../../constants";
import axios from "axios";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom";
import ConfigParent from "../../../components/parent-dashboard/config";
import CustomParent from "../../../components/parent-dashboard/custom";
import GalleryParent from "../../../components/parent-dashboard/gallery";
import GiftListParent from "../../../components/parent-dashboard/gift-list";
import PersonalParent from "../../../components/parent-dashboard/personal";
import NotesParent from "../../../components/parent-dashboard/notes";
import GiftedsParent from "../../../components/parent-dashboard/gifteds";
import { useContext } from "react";
import AuthContext from "../../../hooks/AuthContext";

import testProducts from "../../../testProducts.json";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/actions/userActions";
import { getEventRequest } from "../../../redux/actions/eventsActions";
import Loading from "../../../components/loading";
function ParentDashboard(props) {
  //const [event, setEvent] = useState({});

  const [products, setProducts] = useState([]);

  const { user, loading, err } = useSelector((state) => ({
    user: state.user.user,
    loading: state.user.loading,
    err: state.user.err,
  }));

  const { isLoading, event, eventErr } = useSelector((state) => ({
    isLoading: state.event.isLoading,
    event: state.event.events[0],
    eventErr: state.event.err,
  }));

  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  React.useEffect(() => {
    getEvents();
    console.log(history);
    console.log(props);
    console.log(location);
  }, []);

  const logout = async () => {
    dispatch(logoutAction());
    props.history.push("/");
  };

  const getEvents = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    dispatch(getEventRequest(user));
  };

  return (
    <Row id="parent-dashboard">
      <input
        type="checkbox"
        className="parent-menu-toggle"
        id="parent-menu-toggle"
      />
      <label htmlFor="parent-menu-toggle" className="parent-menu-toggle-label">
        <span></span>
      </label>
      <Col
        span={5}
        className="leftColumn d-flex flex-column align-items-center"
      >
        <img src={require("../../../assets/images/logo-white.png")} alt="" />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <p className="menu-title">MEU EVENTO &lt;3</p>
            <Link to={"/parents/home"}>
              <div
                className={
                  "link " +
                  (props.location.pathname === "/parents/home" ? "active" : "")
                }
              >
                <HomeOutlined className="mr-3" />
                Início
              </div>
            </Link>
            <Link to={"/parents/config"}>
              <div
                className={
                  "link d-flex align-items-center " +
                  (props.location.pathname === "/parents/config"
                    ? "active"
                    : "")
                }
              >
                {/* <img
                    style={{ width: 20 }}
                    className="mr-3"
                    src={require("../../../assets/images/settings.png")}
                  /> */}
                Configurações
              </div>
            </Link>
            <Link to={"/parents/gallery"}>
              <div
                className={
                  "link d-flex align-items-center " +
                  (props.location.pathname === "/parents/gallery"
                    ? "active"
                    : "")
                }
              >
                {/* <img
                    style={{ width: 20 }}
                    className="mr-3"
                    src={require("../../../assets/images/gallery.png")}
                  /> */}
                Galeria
              </div>
            </Link>
            <Link to={"/parents/gifts"}>
              <div
                className={
                  "link d-flex align-items-center " +
                  (props.location.pathname === "/parents/gifts" ? "active" : "")
                }
              >
                {/* <img
                    style={{ width: 20 }}
                    className="mr-3"
                    src={require("../../../assets/images/gift-white.png")}
                  /> */}
                Lista de Presentes
              </div>
            </Link>
            <Link to={"/parents/personal"}>
              <div
                className={
                  "link d-flex align-items-center " +
                  (props.location.pathname === "/parents/personal"
                    ? "active"
                    : "")
                }
              >
                {/* <img
                    style={{ width: 20 }}
                    className="mr-3"
                    src={require("../../../assets/images/user-white.png")}
                  /> */}
                Dados Pessoais
              </div>
            </Link>
            <Link to={"/parents/custom"}>
              <div
                className={
                  "link d-flex align-items-center " +
                  (props.location.pathname === "/parents/custom"
                    ? "active"
                    : "")
                }
              >
                {/* <img
                    style={{ width: 20 }}
                    className="mr-3"
                    src={require("../../../assets/images/paint-brush-white.png")}
                  /> */}
                Personalizar
              </div>
            </Link>

            <a
              className="btn btn-secondary d-flex align-items-center"
              href="https://bellemam.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LOJA BELLE MAN{" "}
              <img src={require("../../../assets/images/enter.png")} alt="" />
            </a>
          </div>
        </div>
      </Col>
      <Col span={19} className="main-section">
        <div
          className={
            "exit-row d-flex mt-3 justify-content-between align-items-center ml-3 mr-3 parent-header-container"
          }
        >
          <p>PAINEL PRINCIPAL</p>
          {event !== null && event !== undefined ? (
            <Link
              to={`/convite/${event.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IR PARA O CONVITE
            </Link>
          ) : null}
          <div
            onClick={() => logout()}
            className={"d-flex align-items-center exit"}
          >
            <p className={"mr-3"}>SAIR</p>
            {/* <img style={{ width: 20 }} src={require("../../../assets/images/enter-purple.png")} /> */}
          </div>
        </div>
        {isLoading === true ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            {event !== null && event !== undefined ? (
              <Switch>
                <div>
                  <Route
                    path={`${props.match.path}/home`}
                    component={() => <HomeParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/config`}
                    component={() => <ConfigParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/gallery`}
                    component={() => <GalleryParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/gifts`}
                    component={() => <GiftListParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/personal`}
                    component={() => <PersonalParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/custom`}
                    component={() => <CustomParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/notes`}
                    component={() => <NotesParent event={event} />}
                  />
                  <Route
                    path={`${props.match.path}/gifteds`}
                    component={() => <GiftedsParent event={event} />}
                  />
                </div>
              </Switch>
            ) : (
              <div
                id="no-event"
                className={"d-flex flex-column align-items-center"}
              >
                <h3 className="mb-5 mt-5">
                  Crie um evento para acessar tais funcionalidades.
                </h3>
                <Link to="/first-steps">
                  <Button className="btn btn-secondary d-flex align-items-center">
                    CRIAR EVENTO
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}

export default ParentDashboard;
