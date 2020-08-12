import React, { Component } from 'react';
import { Row, Col, Radio, Input, DatePicker, TimePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';

import "./style.scss";

export default class Config extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            hour: null,
            address: "",
            dontKnowName: false,
            babyName: "",
            babyBirth: null
        }
    }

    componentDidMount = async () => {
        let user = JSON.parse(await localStorage.getItem('user'));
        console.log(user);
    }

    next = () => {
        if (this.state.date == null || this.state.hour == null || this.state.address == null
            || (this.state.babyName == "" && this.state.dontKnowName == false) || this.state.babyBirth == null) {
            alert("Existem campos vazios. Preencha e tente novamente.");
            return;
        } else {
            this.props.setConfig(this.state)
        }
    }

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
                            <DatePicker
                                onChange={(date, dateString) => { this.setState({ date: dateString }) }}
                                format="DD/MM/YYYY" locale={locale} placeholder={"--/--/--"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Horário do Evento</label>
                        </Col>
                        <Col span={18}>
                            <TimePicker
                                onChange={(date, dateString) => { this.setState({ hour: dateString }) }}
                                locale={locale} placeholder={"hh:mm"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Local do Evento</label>
                        </Col>
                        <Col span={18}>
                            <Input
                                onChange={(e) => { this.setState({ address: e.target.value }) }}
                                placeholder={"Fortaleza"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Já sabe o nome do seu bebê?</label>
                        </Col>
                        <Col style={{ textAlign: "center" }} span={18}>
                            <Radio.Group onChange={(e) => { this.setState({ dontKnowName: e.target.value }) }}>
                                <Radio value={true}>Não sei ainda</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Nome do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <Input
                                onChange={(e) => { this.setState({ babyName: e.target.value }) }} placeholder={""} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Data de Nascimento do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <DatePicker
                                onChange={(date, dateString) => { this.setState({ babyBirth: dateString }) }}
                                format="DD/MM/YYYY" locale={locale} placeholder={"--/--/--"} />
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
