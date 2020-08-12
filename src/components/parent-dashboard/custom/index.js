import React, { Component } from 'react';
import { Row, Col, Radio, Input, Upload, Button, Modal } from 'antd';
import "./style.scss";
import { Constants } from '../../../constants';
import axios from "axios";

export default class CustomParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.event.theme,
            historyText: props.event.history_text,
            phone: props.event.phone,
            inviteText: props.event.invite_text,
            loading: false
        }
        console.log("event", props.event);
    }

    save = async () => {
        const event = this.props.event;
        if (this.state.theme == "" || this.state.historyText == ""
            || this.state.phone == "" || this.state.inviteText == "") {
            Modal.warning({
                content: 'Campos vazios.',
            });
            return;
        }

        let user = JSON.parse(await localStorage.getItem("user"));
        this.setState({ loading: true });

        axios.patch(Constants.ApiUrl + 'events/' + event.id + '/edit', {
            date: event.date,
            type: event.type,
            hour: event.hour,
            address: event.address,
            phone: this.state.phone,
            baby_name: event.baby_name,
            baby_birthday: event.baby_birthday,
            theme: this.state.theme,
            history_text: this.state.historyText,
            invite_text: this.state.inviteText,
            url: event.url,
            baby_image: event.baby_image,
            mom_image: event.mom_image,
            dad_image: event.dad_image,
            background_image: event.background_image
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({ loading: false });
                Modal.success({
                    content: 'Personalização salva!',
                });
            })
            .catch((error) => {
                this.setState({ loading: false });
                Modal.error({
                    content: 'Erro ao salvar.',
                });
                console.log(error);
            })
    }

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
                                <Radio.Group onChange={(e) => this.setState({ theme: e.target.value })}
                                    value={this.state.theme} className="d-flex">
                                    <Radio value="green" className="d-flex align-items-center"><div className="green-ball"></div></Radio>
                                    <Radio value="purple" className="d-flex align-items-center"><div className="purple-ball"></div></Radio>
                                </Radio.Group>
                            </Col>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={24}>
                            <label>Conta para a gente uma história sua e do bebê</label>
                            <Input.TextArea onChange={(e) => this.setState({ historyText: e.target.value })}
                                value={this.state.historyText} style={{ marginTop: 10 }} placeholder={"Escrever..."} />
                        </Col>
                    </Row>
                    {/* <Row align="middle">
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
                    </Row> */}
                    <Row align="middle">
                        <Col span={6}>
                            <label>Tel. de Contato</label>
                        </Col>
                        <Col span={18}>
                            <Input onChange={(e) => this.setState({ phone: e.target.value })}
                                value={this.state.phone} placeholder={"(85) 99999-9999"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={24}>
                            <label>Escreva um textinho para chamar os convidados</label>
                            <Input.TextArea onChange={(e) => this.setState({ inviteText: e.target.value })}
                                value={this.state.inviteText} style={{ marginTop: 10 }} placeholder={"Escrever..."} />
                        </Col>
                    </Row>

                    <button onClick={() => this.save()} className="btn btn-secondary">
                        SALVAR
                    </button>
                </div>
            </div>
        );
    }
}
