import React, { Component, useContext, useState } from "react";
import "./style.scss";
import { Card, Row, Col, Form, Input, Modal, Button } from "antd";
import axios from "axios";
import { Constants } from "../../constants";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/userActions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, signIn, isLoading, setIsLoading } = useContext(AuthContext);

  const { user, loading, err } = useSelector((state) => ({
    user: state.user.user,
    loading: state.user.loading,
    err: state.user.err,
  }));

  const dispatch = useDispatch();

  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    dispatch(loginAction(email, password));
  };

  React.useEffect(async () => {
    if (user.keys().length !== 0) {
      // const response = await JSON.parse(localStorage.getItem("user"));
      // if (response.role === "parent") {
      //   history.push("/parents/home");
      // } else if (response.role === "admin") {
      //   history.push("/admin/products");
      // } else if (response.role === "guest") {
      //   history.push("/guest/personal");
      // } else {
      //   alert("Erro ao efetuar login.");
      // }
      console.log(user);
    }
  }, [user]);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
    const response = await JSON.parse(localStorage.getItem("user"));
    if (response.role === "parent") {
      history.push("/parents/home");
    } else if (response.role === "admin") {
      history.push("/admin/products");
    } else if (response.role === "guest") {
      history.push("/guest/personal");
    } else {
      alert("Erro ao efetuar login.");
    }
  };

  return (
    <div
      id="login"
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <img src={require("../../assets/images/logo-white.png")} alt="" />
      <Card className="card">
        <Row>
          <Col className="login-img" span={12}></Col>
          <Col
            className="login-form d-flex flex-column justify-content-center"
            span={12}
          >
            <div className="d-flex justify-content-center align-items-center title-box">
              <h2>Entrar</h2>
              <img
                src={require("../../assets/images/purple-heart.png")}
                alt=""
              />
            </div>
            <div className="form justify-content-center">
              <Row>
                <Col span={4}>
                  <label>Email</label>
                </Col>
                <Col span={20}>
                  <Input
                    type="text"
                    value={email}
                    onChange={handleEmail}
                    placeholder={"anafreitas1@gmail.com"}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <label>Senha</label>
                </Col>
                <Col span={20}>
                  <Input
                    type="password"
                    onChange={handlePassword}
                    placeholder={"*********"}
                  />
                </Col>
              </Row>

              <Button
                loading={isLoading}
                onClick={handleLogin}
                className="btn btn-secondary"
              >
                ENTRAR
              </Button>

              <div className="link text-center mt-5">
                <Link to="/register">Ainda não é Cadastrado? Cadastre-se</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
