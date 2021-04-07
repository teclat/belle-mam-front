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
import { Link, Switch, Route } from "react-router-dom";
import ConfigParent from "../../../components/parent-dashboard/config";
import CustomParent from "../../../components/parent-dashboard/custom";
import GalleryParent from "../../../components/parent-dashboard/gallery";
import GiftListParent from "../../../components/parent-dashboard/gift-list";
import PersonalParent from "../../../components/parent-dashboard/personal";
import NotesParent from "../../../components/parent-dashboard/notes";
import GiftedsParent from "../../../components/parent-dashboard/gifteds";
import { useContext } from "react";
import AuthContext from "../../../hooks/AuthContext";

function ParentDashboard(props) {
  const [event, setEvent] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const { isAuth } = useContext(AuthContext);

  React.useEffect(() => {
    getEvents();
  }, []);

  const logout = async () => {
    await localStorage.removeItem("user");
    props.history.push("/");
  };

  const getEvents = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    console.log("user", user);

    axios
      .get(Constants.ApiUrl + "events/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("event", response.data);
        let event = response.data.length > 0 ? response.data[0] : {};
        setEvent(event);
        console.log(event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dashboardIsloading = () => {
    setIsloading(true);
    console.log("Carregando Dashboard...");
    setIsloading(false);
  };

  //get();
  //let url = "https://belle-mam.herokuapp.com/convite/" + event.url;
  let url = "";
  console.log(props);
  console.log(event);
  return (
    <Row id="parent-dashboard">
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
      <Col span={19}>
        <div
          className={
            "exit-row d-flex mt-3 justify-content-between align-items-center ml-3 mr-3"
          }
        >
          <p>PAINEL PRINCIPAL</p>
          {Object.keys(event).length !== 0 && event.url ? (
            <a target="_blank" rel="noopener noreferrer" href={url}>
              IR PARA O CONVITE
            </a>
          ) : null}
          <div
            onClick={() => logout()}
            className={"d-flex align-items-center exit"}
          >
            <p className={"mr-3"}>SAIR</p>
            {/* <img style={{ width: 20 }} src={require("../../../assets/images/enter-purple.png")} /> */}
          </div>
        </div>
        {Object.keys(event).length !== 0 ? (
          <Switch>
            <div>
              <Route
                path={`${props.match.path}/home`}
                component={() => (
                  <HomeParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/config`}
                component={() => (
                  <ConfigParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/gallery`}
                component={() => (
                  <GalleryParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/gifts`}
                component={() => (
                  <GiftListParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/custom`}
                component={() => (
                  <CustomParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/personal`}
                component={() => (
                  <PersonalParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/notes`}
                component={() => (
                  <NotesParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
              />
              <Route
                path={`${props.match.path}/gifteds`}
                component={() => (
                  <GiftedsParent
                    event={event}
                    dashboardIsloading={dashboardIsloading}
                  />
                )}
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
      </Col>
    </Row>
  );
}

export default ParentDashboard;
