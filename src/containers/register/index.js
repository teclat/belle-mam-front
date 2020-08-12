import React, { Component } from 'react';
import "./style.scss";
import { Card, Row, Col, Form, Input, Radio, Button, Select } from 'antd';
import axios from "axios";
import { Constants } from '../../constants';

const { Option } = Select;
export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: null,
            name: "",
            email: "",
            city: "",
            state: "",
            phone: "",
            events: "",
            password: "",
            relationship: null
        }
    }

    register = () => {
        console.log(this.state);
        if (this.state.role == "parent") {
            if (this.state.email === "" || this.state.password === "" || this.state.name === ""
                || this.state.phone === "" || this.state.city === "" || this.state.state === ""
                || this.state.relationship === null || this.state.events.length === 0) {
                alert("Existem campos vazios. Preencha e tente novamente.");
                return;
            }
        } else {
            if (this.state.email === "" || this.state.password === "" || this.state.name === ""
                || this.state.phone === "" || this.state.city === "" || this.state.state === ""
                || this.state.events.length === 0) {
                alert("Existem campos vazios. Preencha e tente novamente.");
                return;
            }
        }

        axios.post(Constants.ApiUrl + 'users/create', {
            role: this.state.role,
            name: this.state.name,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            events: this.state.events,
            password: this.state.password,
            relationship: this.state.relationship
        })
            .then((response) => {
                console.log(response.data);
                let user = response.data;
                localStorage.setItem("user", JSON.stringify(user));

                if (user.role === "parent") {
                    this.props.history.push('/parents/first-steps');
                } else if (user.role === "admin") {
                    this.props.history.push('/admin/products');
                } else if (user.role === "guest") {
                    this.props.history.push('/guest/personal');
                } else {
                    alert("Erro de executar cadastro.");
                }
            })
            .catch((error) => {
                alert("Erro de executar cadastro.");
                console.log(error);
            })
    }

    render() {
        return (
            <div id="register" className="d-flex flex-column align-items-center justify-content-center">
                <img src={require("../../assets/images/logo-white.png")} />
                <Card className="card">
                    <Row>
                        <Col className="register-img" span={12}>
                        </Col>
                        <Col className="register-form" span={12}>
                            <div className="d-flex justify-content-center align-items-center title-box">
                                <h2>Faça Seu Cadastro</h2>
                                <img src={require("../../assets/images/purple-heart.png")} />
                            </div>
                            {
                                this.state.role == null ?
                                    <div className="roles justify-content-center">
                                        <h5>Qual seu tipo de usuário?</h5>

                                        <div onClick={() => {
                                            this.setState({ role: "guest" })
                                        }} className="btn btn-secondary">
                                            CONVIDADO
                                        </div>
                                        <div onClick={() => {
                                            this.setState({ role: "parent" })
                                        }} className="btn btn-secondary">
                                            PAI/MÃE
                                        </div>
                                    </div>
                                    :
                                    <div className="form justify-content-center">
                                        <Row align="middle">
                                            <Col span={4}>
                                                <label>Nome</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                    placeholder={"Ana Freitas"} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <label>Email</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                                                    placeholder={"anafreitas1@gmail.com"} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <label>Senha</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                                                    type="password" placeholder={"*******"} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <label>Telefone</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                                    placeholder={"(85) 99999 9999"} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <label>Cidade</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ city: e.target.value }) }}
                                                    placeholder={"Fortaleza"} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <label>Estado</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ state: e.target.value }) }}
                                                    placeholder={"Ceará"} />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={4}>
                                                <label>Tipo de Evento</label>
                                            </Col>
                                            <Col span={20}>
                                                <Select
                                                    mode="multiple"
                                                    placeholder="Selecione"
                                                    onChange={(values) => this.setState({ events: values })}
                                                >
                                                    <Option value="revelation">Chá Revelação</Option>
                                                    <Option value="diaper">Chá de Fralda</Option>
                                                    <Option value="baby">Chá de Bebê</Option>
                                                    <Option value="baptize">Batizado</Option>
                                                    <Option value="birth_day">Aniversário</Option>
                                                </Select>
                                            </Col>
                                        </Row>

                                        {this.state.role == "parent" ?
                                            <Row>
                                                <Col span={4}>
                                                    <label>Parentesco</label>
                                                </Col>
                                                <Col style={{ textAlign: "center" }} span={20}>
                                                    <Radio.Group
                                                        onChange={(e) => { this.setState({ relationship: e.target.value }) }}
                                                    >
                                                        <Radio value="dad">Papai</Radio>
                                                        <Radio value="mom">Mamãe</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row> : null
                                        }

                                        <div
                                            onClick={() => { this.register() }}
                                            className="btn btn-secondary">
                                            CADASTRAR!
                                        </div>
                                    </div>
                            }
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
