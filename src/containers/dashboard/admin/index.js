import React, { Component } from "react";
import "./style.scss";
import { Row, Col } from "antd";
import {
  HomeOutlined,
  SettingFilled,
  GiftFilled,
  PictureOutlined,
  UserOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { Link, Switch, Route } from "react-router-dom";
import NewProduct from "../../../components/admin-dashboard/new-product";
import Products from "../../../components/admin-dashboard/products";
import CustomHome from "../../../components/admin-dashboard/custom-home";

function AdminDashboard(props) {
  const logout = async () => {
    await localStorage.removeItem("user");
    props.history.push("/");
  };

  return (
    <Row id="admin-dashboard">
      <Col
        span={5}
        className="leftColumn d-flex flex-column align-items-center"
      >
        <img src={require("../../../assets/images/logo-white.png")} alt="" />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <Link to={"/admin/products"}>
              <div
                className={
                  "link " +
                  (props.location.pathname === "/admin/products"
                    ? "active"
                    : "")
                }
              >
                <HomeOutlined className="mr-3" />
                Produtos
              </div>
            </Link>
            <Link to={"/admin/new-product"}>
              <div
                className={
                  "link " +
                  (props.location.pathname === "/admin/new-product"
                    ? "active"
                    : "")
                }
              >
                <SettingFilled className="mr-3" />
                Novo Produto
              </div>
            </Link>
            <Link to={"/admin/custom"}>
              <div
                className={
                  "link " +
                  (props.location.pathname === "/admin/custom" ? "active" : "")
                }
              >
                <HighlightOutlined className="mr-3" />
                Personalizar Home
              </div>
            </Link>

            <button class="btn btn-secondary d-flex align-items-center">
              LOJA BELLE MAN{" "}
              <img src={require("../../../assets/images/enter.png")} alt="" />
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
            onClick={() => logout()}
            className={"d-flex align-items-center exit"}
          >
            <p className={"mr-3"}>SAIR</p>
            {/* <img style={{ width: 20 }} src={require("../../../assets/images/enter-purple.png")} /> */}
          </div>
        </div>
        <Switch>
          <div>
            <Route path={`${props.match.path}/products`} component={Products} />
            <Route
              path={`${props.match.path}/new-product`}
              component={NewProduct}
            />
            <Route path={`${props.match.path}/custom`} component={CustomHome} />
          </div>
        </Switch>
      </Col>
    </Row>
  );
}

export default AdminDashboard;
