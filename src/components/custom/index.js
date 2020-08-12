import React, { Component } from 'react'
import { Row, Col, Radio, Input, Upload, Button, Modal } from 'antd';
import "./style.scss";
import { CheckCircleOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { Constants } from '../../constants';
import axios from "axios";
export default class Customization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: null,
            historyText: "",
            inviteText: "",
            phone: "",
            url: "",
            validUrl: false
        }
    }

    next = () => {
        if (this.state.theme == null || this.state.inviteText == "" || this.state.url == ""
            || this.state.historyText == "" || this.state.phone == "") {
            Modal.error("Existem campos vazios. Preencha e tente novamente.");
            return;
        } else if (this.state.validUrl == false) {
            Modal.error("URL inválida.");
            return;
        } else {
            this.props.setCustom(this.state)
        }
    }

    verifyUrl = async (url) => {
        let user = JSON.parse(await localStorage.getItem("user"));

        axios.get(Constants.ApiUrl + 'events/verify/' + url, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({ validUrl: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div id="custom">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <div className="d-flex">
                        <h2>Ótimo!</h2>
                        <img src={require("../../assets/images/purple-heart.png")} />
                    </div>
                    <h4>Agora vamos personalizar sua página do evento</h4>
                </div>
                <div className="form justify-content-center">
                    <Row align="middle">
                        <Col span={6}>
                            <label>Tema</label>
                        </Col>
                        <Col span={18}>
                            <Col style={{ textAlign: "center" }} span={18}>
                                <Radio.Group onChange={(e) => { this.setState({ theme: e.target.value }) }} className="d-flex">
                                    <Radio value="green" className="d-flex align-items-center"><div className="green-ball"></div></Radio>
                                    <Radio value="purple" className="d-flex align-items-center"><div className="purple-ball"></div></Radio>
                                </Radio.Group>
                            </Col>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Endereço URL</label>
                        </Col>
                        <Col span={18}>
                            <Row align="middle">
                                <Col span={20}>
                                    <Input
                                        onChange={(e) => { this.setState({ url: e.target.value }); this.verifyUrl(e.target.value); }}
                                        placeholder={"mariaalice"} />
                                </Col>
                                <Col justify="center" offset={2} span={2}>
                                    {this.state.validUrl ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseSquareOutlined style={{ color: "red" }} />}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={24}>
                            <label>Conta para a gente uma história sua e do bebê</label>
                            <Input.TextArea
                                onChange={(e) => { this.setState({ historyText: e.target.value }) }}
                                style={{ marginTop: 10 }} placeholder={"Escrever..."} />
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
                            <Input
                                onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                placeholder={"(85) 99999-9999"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={24}>
                            <label>Escreva um textinho para chamar os convidados</label>
                            <Input.TextArea
                                onChange={(e) => { this.setState({ inviteText: e.target.value }) }}
                                style={{ marginTop: 10 }} placeholder={"Escrever..."} />
                        </Col>
                    </Row>

                    <button onClick={() => this.next()} className="btn btn-secondary">
                        AVANÇAR
                    </button>
                </div>
            </div>
        )
    }
}
