import React, { Component } from 'react'
import "./style.scss";
import { Card, Row, Col, Form, Input, Radio, Button } from 'antd';

export default class PersonalParent extends Component {
    render() {
        return (
            <div id="personal-parent">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Dados Pessoais</h4>
                </div>
                <div className="form justify-content-center">
                    <Row align="middle">
                        <Col span={4}>
                            <label>Nome</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={"Ana Freitas"} />
                        </Col>
                    </Row>
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
                            <label>Telefone</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={"(85) 99999 9999"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Cidade</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={"Fortaleza"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Estado</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={"Ceará"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Tipo de Evento</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={"Selecione"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Parentesco</label>
                        </Col>
                        <Col style={{ textAlign: "center" }} span={20}>
                            <Radio.Group>
                                <Radio value="father">Papai</Radio>
                                <Radio value="mother">Mamãe</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                    <button onClick={() => this.props.next()} className="btn btn-secondary">
                        SALVAR
                    </button>
                </div>
            </div>
        )
    }
}
