import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Modal, Input, DatePicker, TimePicker, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Constants } from '../../../constants';
import axios from "axios";

import "./style.scss";

export default class ConfigParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(props.event.date),
            dateString: moment(props.event.date).format('DD/MM/YYYY'),
            hour: moment("2020-10-01T" + props.event.hour + ".000Z"),
            hourString: props.event.hour,
            address: props.event.address,
            live: props.event.live,
            babyName: props.event.baby_name,
            babyBirthday: moment(props.event.baby_birthday),
            babyBirthdayString: moment(props.event.baby_birthday).format('DD/MM/YYYY'),
            loading: false
        }
        console.log("event", props.event);
    }

    save = async () => {
        const event = this.props.event;
        if (this.state.dateString == "" || this.state.hourString == "" || this.state.address == ""
            || this.state.babyName == "" || this.state.babyBirthdayString == "") {
            Modal.warning({
                content: 'Campos vazios.',
            });
            return;
        }

        let user = JSON.parse(await localStorage.getItem("user"));
        this.setState({ loading: true });

        let date = this.state.dateString.split("/");
        let babyBirth = this.state.babyBirthdayString.split("/");

        axios.patch(Constants.ApiUrl + 'events/' + event.id + '/edit', {
            date: date[2] + "-" + date[1] + "-" + date[0],
            type: event.type,
            hour: this.state.hourString,
            address: this.state.address,
            phone: event.phone,
            live: this.state.live,
            baby_name: this.state.babyName,
            baby_birthday: babyBirth[2] + "-" + babyBirth[1] + "-" + babyBirth[0],
            theme: event.theme,
            history_text: event.history_text,
            invite_text: event.invite_text,
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
                    content: 'Configurações salvas!',
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
        console.log("bay birthday", this.state.babyBirthdayString);
        console.log("date", this.state.dateString);
        return (
            <div id="config-parent">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Configurações</h4>
                </div>
                <div className="form justify-content-center">
                    <Row align="middle">
                        <Col span={6}>
                            <label>Data do Evento</label>
                        </Col>
                        <Col span={18}>
                            <DatePicker onChange={(date, dateString) => { this.setState({ date: date, dateString: dateString }) }}
                                value={this.state.date} format="DD/MM/YYYY" locale={locale}
                                placeholder={"--/--/--"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Horário do Evento</label>
                        </Col>
                        <Col span={18}>
                            <TimePicker onChange={(date, dateString) => this.setState({ hour: date, dateString: dateString })}
                                value={this.state.hour} locale={locale} placeholder={"hh:mm"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Local do Evento</label>
                        </Col>
                        <Col span={18}>
                            <Input onChange={(e) => this.setState({ address: e.target.value })}
                                value={this.state.address} placeholder={"Fortaleza"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>URL da Live</label>
                        </Col>
                        <Col span={18}>
                            <Input onChange={(e) => this.setState({ live: e.target.value })}
                                value={this.state.live} placeholder={"Fortaleza"} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Nome do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <Input onChange={(e) => this.setState({ babyName: e.target.value })}
                                value={this.state.babyName} placeholder={""} />
                        </Col>
                    </Row>
                    <Row align="middle">
                        <Col span={6}>
                            <label>Data de Nascimento do Bebê</label>
                        </Col>
                        <Col span={18}>
                            <DatePicker onChange={(date, dateString) => { this.setState({ babyBirthday: date, babyBirthdayString: dateString }) }}
                                value={this.state.babyBirthday} format="DD/MM/YYYY" locale={locale} placeholder={"--/--/--"} />
                        </Col>
                    </Row>

                    <Button
                        loading={this.state.loading}
                        onClick={() => this.save()} className="btn btn-secondary">
                        SALVAR
                    </Button>
                </div>
            </div>
        )
    }
}
