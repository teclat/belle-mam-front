import React, { Component } from 'react';
import "./style.scss";
import { Card, Row, Col, Form, Input, Radio, Button } from 'antd';

export default class Login extends Component {
    render() {
        return (
            <div id="login" className="d-flex flex-column align-items-center justify-content-center">
                <img src={require("../../assets/images/logo-white.png")} />
                <Card className="card">
                    <Row>
                        <Col className="login-img" span={12}>
                        </Col>
                        <Col className="login-form d-flex flex-column justify-content-center" span={12}>
                            <div className="d-flex justify-content-center align-items-center title-box">
                                <h2>Entrar</h2>
                                <img src={require("../../assets/images/purple-heart.png")} />
                            </div>
                            <div className="form justify-content-center">
                                <Row>
                                    <Col span={4}>
                                        <label>Email</label>
                                    </Col>
                                    <Col span={20}>
                                        <Input placeholder={"anafreitas1@gmail.com"} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4}>
                                        <label>Senha</label>
                                    </Col>
                                    <Col span={20}>
                                        <Input placeholder={"*********"} />
                                    </Col>
                                </Row>

                                <div
                                    className="btn btn-secondary">
                                    ENTRAR
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
