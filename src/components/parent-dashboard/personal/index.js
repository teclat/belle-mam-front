import React, { Component } from 'react'
import "./style.scss";
import { Card, Row, Col, Modal, Input, Radio, Button } from 'antd';
import { Constants } from '../../../constants';
import axios from "axios";
export default class PersonalParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            name: '',
            phone: '',
            city: '',
            state: '',
            relationship: '',
            role: '',
            loading: false
        }
        this.get();
    }

    get = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));

        axios.get(Constants.ApiUrl + 'users/' + user.id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                let user = response.data;
                this.setState({
                    user: user, name: user.name, phone: user.phone, role: user.role,
                    city: user.city, state: user.state, relationship: user.relationship
                })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));

        if (this.state.name === "" || this.state.phone === "" || this.state.city === ""
            || this.state.state === "" || this.state.relationship === null) {
            Modal.error({ content: "Existem campos vazios. Preencha e tente novamente." });

            return;
        }

        this.setState({ loading: true });

        axios.post(Constants.ApiUrl + 'users/update', {
            name: this.state.name,
            email: this.state.user.email,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            relationship: this.state.relationship
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                this.setState({ loading: false });
                Modal.success({ content: "Salvo com sucesso!" });
            })
            .catch((error) => {
                this.setState({ loading: false });
                Modal.error({ content: "Erro de executar cadastro." });
                console.log(error);
            })
    }

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
                            <Input
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                                placeholder={"Ana Freitas"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Telefone</label>
                        </Col>
                        <Col span={20}>
                            <Input
                                value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })}
                                placeholder={"(85) 99999 9999"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Cidade</label>
                        </Col>
                        <Col span={20}>
                            <Input
                                value={this.state.city}
                                onChange={(e) => this.setState({ city: e.target.value })}
                                placeholder={"Fortaleza"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <label>Estado</label>
                        </Col>
                        <Col span={20}>
                            <Input
                                value={this.state.state}
                                onChange={(e) => this.setState({ state: e.target.value })}
                                placeholder={"Ceará"} />
                        </Col>
                    </Row>

                    {
                        this.state.role == "parent" ?
                            <Row>
                                <Col span={4}>
                                    <label>Parentesco</label>
                                </Col>
                                <Col style={{ textAlign: "center" }} span={20}>
                                    <Radio.Group
                                        value={this.state.relationship}
                                        onChange={(e) => this.setState({ relationship: e.target.value })}
                                    >
                                        <Radio value="dad">Papai</Radio>
                                        <Radio value="mom">Mamãe</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row> : null
                    }

                    <Button loading={this.state.loading} onClick={() => this.update()} className="btn btn-secondary">
                        SALVAR
                    </Button>
                </div>
            </div>
        )
    }
}
