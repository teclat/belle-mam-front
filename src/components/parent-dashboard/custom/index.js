import React, { Component } from 'react';
import { Row, Col, Radio, Input, Upload, Button } from 'antd';
import "./style.scss";

export default class CustomParent extends Component {
    render() {
        return (
            <div id="custom-parent">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Personalizar</h4>
                </div>
                <div className="form justify-content-center">
                    <Row align="middle">
                        <Col span={6}>
                            <label>Tema</label>
                        </Col>
                        <Col span={18}>
                            <Col style={{ textAlign: "center" }} span={18}>
                                <Radio.Group className="d-flex">
                                    <Radio value="green" className="d-flex align-items-center"><div className="green-ball"></div></Radio>
                                    <Radio value="purple" className="d-flex align-items-center"><div className="purple-ball"></div></Radio>
                                </Radio.Group>
                            </Col>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Endereço</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={""} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={24}>
                            <label>Conta para a gente uma história sua e do bebê</label>
                            <Input.TextArea style={{ marginTop: 10 }} placeholder={"Escrever..."} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <Upload>
                                <Button>
                                    Escolher...
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto da Mamãe</label>
                        </Col>
                        <Col span={18} className="d-flex">
                            <Upload>
                                <Button>
                                    Escolher...
                                </Button>
                            </Upload>
                            <Radio.Group>
                                <Radio value="no">Prefiro não enviar</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Papai</label>
                        </Col>
                        <Col span={18} className="d-flex">
                            <Upload>
                                <Button>
                                    Escolher...
                                </Button>
                            </Upload>
                            <Radio.Group>
                                <Radio value="no">Prefiro não enviar</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Fundo</label>
                        </Col>
                        <Col span={18}>
                            <Upload>
                                <Button>
                                    Escolher...
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Tel. de Contato</label>
                        </Col>
                        <Col span={18}>
                            <Input placeholder={"(85) 99999-9999"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={24}>
                            <label>Escreva um textinho para chamar os convidados</label>
                            <Input.TextArea style={{ marginTop: 10 }} placeholder={"Escrever..."} />
                        </Col>
                    </Row>

                    <button onClick={() => this.props.next()} className="btn btn-secondary">
                        SALVAR
                    </button>
                </div>
            </div>
        );
    }
}
