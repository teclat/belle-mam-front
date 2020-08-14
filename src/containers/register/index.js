import React, { Component } from 'react';
import "./style.scss";
import { Card, Row, Col, Upload, Input, Radio, Button, Select, Modal } from 'antd';
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
            relationship: null,
            loading: false,
            image: null,
        }
    }

    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    beforeUpload = async (file) => {
        console.log("file", file);

        let filedata = '';
        this.getBase64(file, (result) => {
            filedata = result;
            this.setState({ image: filedata })
        });
    }

    register = () => {
        console.log(this.state);
        if (this.state.role == "parent") {
            if (this.state.email === "" || this.state.password === "" || this.state.name === ""
                || this.state.phone === "" || this.state.city === "" || this.state.state === ""
                || this.state.relationship === null || this.state.image === null || this.state.events.length === 0) {
                Modal.error({ content: "Existem campos vazios. Preencha e tente novamente." });
                return;
            }
        } else {
            if (this.state.email === "" || this.state.password === "" || this.state.name === ""
                || this.state.phone === "" || this.state.city === "" || this.state.image === null || this.state.state === ""
                || this.state.events.length === 0) {
                Modal.error({ content: "Existem campos vazios. Preencha e tente novamente." });
                return;
            }
        }

        this.setState({ loading: true })

        axios.post(Constants.ApiUrl + 'users/create', {
            role: this.state.role,
            name: this.state.name,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            events: this.state.events,
            password: this.state.password,
            image: this.state.image,
            relationship: this.state.relationship
        })
            .then((response) => {
                this.setState({ loading: false })
                console.log(response.data);
                // let user = response.data;
                // localStorage.setItem("user", JSON.stringify(user));

                this.props.history.push('/');
                Modal.success({ content: "Cadastro realizado." });
                // if (user.role === "parent") {
                // } else if (user.role === "admin") {
                //     this.props.history.push('/admin/products');
                // } else if (user.role === "guest") {
                //     this.props.history.push('/guest/personal');
                // } else {
                //     Modal.error({ content: "Erro de executar cadastro." });
                // }
            })
            .catch((error) => {
                this.setState({ loading: false })
                Modal.error({ content: "Erro de executar cadastro." });
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
                                        <Row align="middle">
                                            <Col span={4}>
                                                <label>Email</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                                                    placeholder={"anafreitas1@gmail.com"} />
                                            </Col>
                                        </Row>
                                        <Row align="middle">
                                            <Col span={4}>
                                                <label>Senha</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                                                    type="password" placeholder={"*******"} />
                                            </Col>
                                        </Row>
                                        <Row align="middle">
                                            <Col span={4}>
                                                <label>Telefone</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                                    placeholder={"(85) 99999 9999"} />
                                            </Col>
                                        </Row>
                                        <Row align="middle">
                                            <Col span={4}>
                                                <label>Cidade</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ city: e.target.value }) }}
                                                    placeholder={"Fortaleza"} />
                                            </Col>
                                        </Row>
                                        <Row align="middle">
                                            <Col span={4}>
                                                <label>Estado</label>
                                            </Col>
                                            <Col span={20}>
                                                <Input
                                                    onChange={(e) => { this.setState({ state: e.target.value }) }}
                                                    placeholder={"Ceará"} />
                                            </Col>
                                        </Row>
                                        <Row align="middle">
                                            <Col span={5}>
                                                <label>Foto</label>
                                            </Col>
                                            <Col span={19}>
                                                <Upload name="file" customRequest={this.dummyRequest}
                                                    beforeUpload={this.beforeUpload}>
                                                    <Button>
                                                        Escolher...
                                                    </Button>
                                                </Upload>
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

                                        <Button
                                            loading={this.state.loading}
                                            onClick={() => { this.register() }}
                                            className="btn btn-secondary"
                                        >
                                            CADASTRAR!
                                        </Button>
                                    </div>
                            }
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
