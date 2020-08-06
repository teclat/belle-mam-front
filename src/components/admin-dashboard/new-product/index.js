import React, { Component } from 'react';
import "./style.scss";
import { Card, Row, Col, Form, Input, Upload, Button } from 'antd';

export default class NewProduct extends Component {
    render() {
        return (
            <div id="new-product">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Novo Produto</h4>
                </div>
                <div className="form justify-content-center">
                    <Row align="middle">
                        <Col span={4}>
                            <label>Nome</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={""} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <label>Descrição</label>
                            <Input.TextArea className="mt-3" placeholder={"Escrever..."} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Foto do Produto</label>
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
                        <Col span={4}>
                            <label>Preço</label>
                        </Col>
                        <Col span={20}>
                            <Input placeholder={"R$ 0,00"} />
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
