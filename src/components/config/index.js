import React, { Component } from 'react';
import { Row, Col, Radio, Input } from 'antd';
import "./style.scss";

export default class Config extends Component {
    render() {
        return (
            <div id="config">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <div className="d-flex">
                        <h2>Olá, Fulana</h2>
                        <img src={require("../../assets/images/purple-heart.png")} />
                    </div>
                    <h4>Vamos personalizar a página do evento do seu bebê</h4>
                </div>
                <div className="form justify-content-center">
                    <Row align="middle">
                        <Col span={6}>
                            <label>Data do Evento</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={"--/--/--"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Horário do Evento</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={"hh:mm"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Local do Evento</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={"Fortaleza"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Já sabe o nome do seu bebê?</label>
                        </Col>
                        <Col style={{ textAlign: "center" }} span={18}>
                            <Radio.Group>
                                <Radio value="no">Não sei ainda</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Nome do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={""} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Data de Nascimento do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={"--/--/--"} />
                        </Col>
                    </Row>

                    <button onClick={() => this.props.next()} className="btn btn-secondary">
                        AVANÇAR
                    </button>
                </div>
            </div>
        )
    }
}
