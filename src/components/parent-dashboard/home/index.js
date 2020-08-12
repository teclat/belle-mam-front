import React, { Component } from 'react';
import "./style.scss";
import { Col, Row } from 'antd';
import {
    ShareAltOutlined, WhatsAppOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default class HomeParent extends Component {
    render() {
        return (
            <Col id="home-parent">
                <Row className="p-3 mt-5 mb-5 d-flex">
                    <div className="d-flex flex-column justify-content-center align-items-center title-box">
                        <div className="d-flex">
                            <h2>Olá, Fulana!</h2>
                            <img src={require("../../../assets/images/purple-heart.png")} />
                        </div>
                    </div>
                    <h3>
                        FALTAM <span>02</span> DIAS
                    </h3>
                </Row>
                <Row align="stretch">
                    <Col className="d-flex" span={12}>
                        <div className="box ml-3 mr-3" style={{ width: "100%" }}>
                            <h5 className="mb-4">Último recebido</h5>
                            <Row align="stretch">
                                <Col span={12}>
                                    <img className="product-img" src={require("../../../assets/images/colar.png")} />
                                </Col>
                                <Col className="d-flex flex-column justify-content-around" span={12}>
                                    <h5>Colar de Âmbar</h5>
                                    <h5>R$ <span>29</span></h5>
                                    <button className="btn btn-primary">VER TODOS</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Row className="box last-note mr-3 mb-3">
                            <Row className="mb-3">
                                <h5>Último recado</h5>
                                <Link to={'/parents/notes'}>
                                    <button className="btn btn-primary small">VER TODOS</button>
                                </Link>
                            </Row>
                            <Row>
                                <Col span={6} class="note-img mr-5">
                                    <img src={require("../../../assets/images/couple-testimonial.jpg")} />
                                </Col>
                                <Col span={18}>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad.”</p>
                                </Col>
                            </Row>
                        </Row>
                        <Row align="stretch">
                            <Col className="d-flex" span={13}>
                                <div className="box mr-3 text-center d-flex flex-column align-items-center justify-content-center">
                                    <h5>Total de Presentes</h5>
                                    <h5 className="money">R$ <span>329</span></h5>
                                    <button className="btn btn-primary small">VER TODOS</button>
                                </div>
                            </Col>
                            <Col className="d-flex" span={11}>
                                <div style={{ width: "100%" }}
                                    className="box text-center mr-3 d-flex flex-column align-items-center justify-content-center">
                                    <h5>Qtd. presentes</h5>
                                    <h5 className="money"><span>42</span></h5>
                                    <button className="btn btn-primary small">VER TODOS</button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify="space-between" className="p-3 mt-3">
                    <button className="btn btn-primary">
                        <ShareAltOutlined className="mr-3" />
                        COMPARTILHAR EVENTO
                        </button>
                    <a target={'_blank'} href="https://api.whatsapp.com/send?phone='5585981768451'&text=%20Oi, tudo bem. Pode me ajudar?%20" className="btn btn-secondary">
                        SAC
                        <WhatsAppOutlined className="ml-3" />
                    </a>
                </Row>
            </Col>
        )
    }
}
