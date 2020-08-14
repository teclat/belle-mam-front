import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Config from '../../components/config';
import Custom from '../../components/custom';
import "./style.scss";
import SelectGifts from '../../components/select-gifts';
import axios from "axios";
import { Constants } from '../../constants';
import { Modal } from 'antd';

export default class FirstStep extends Component {
    state = {
        page: 1,
        config: {},
        custom: {},
        loading: false
    }

    setConfig = (state) => {
        console.log(state)
        this.setState({ config: state });
        this.next();
    }

    setCustom = (state) => {
        console.log(state)
        this.setState({ custom: state });
        this.next();
    }

    next = () => {
        this.setState({ page: this.state.page + 1 });
    }

    save = async (selecteds) => {
        let date = this.state.config.date.split("/");
        let babyBirth = this.state.config.babyBirth.split("/");
        let hour = this.state.config.hour.split(":");
        let user = JSON.parse(await localStorage.getItem('user'));
        console.log(user);

        let body = {
            type: this.state.config.type,
            date: date[2] + "-" + date[1] + "-" + date[0],
            hour: hour[0] + ":" + hour[1],
            address: this.state.config.address,
            live: this.state.config.live,
            baby_image: this.state.custom.baby_image,
            mom_image: this.state.custom.mom_image,
            dad_image: this.state.custom.dad_image,
            mom_name: this.state.custom.mom_name,
            dad_name: this.state.custom.dad_name,
            background_image: this.state.custom.background_image,
            phone: this.state.custom.phone,
            baby_name: this.state.config.babyName,
            baby_birthday: babyBirth[2] + "-" + babyBirth[1] + "-" + babyBirth[0],
            theme: this.state.custom.theme,
            history_text: this.state.custom.historyText,
            invite_text: this.state.custom.inviteText,
            url: this.state.custom.url,
            products: selecteds
        }

        this.setState({ loading: true })
        axios.post(Constants.ApiUrl + "events/" + user.id + "/create", body, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                this.setState({ loading: false })
                console.log(response.data);
                this.props.history.push('/parents/home');
            })
            .catch((error) => {
                this.setState({ loading: true })
                Modal.error({ content: "Erro de executar cadastro." });
                console.log(error);
            })
    }

    render() {
        let content = null;
        if (this.state.page == 1) {
            content = <>
                <Col span={3}></Col>
                <Col span={12}>
                    <Config setConfig={this.setConfig} />
                </Col>
                <Col span={3}></Col>
            </>
        } else if (this.state.page == 2) {
            content = <>
                <Col span={3}></Col>
                <Col span={12}>
                    <Custom setCustom={this.setCustom} />
                </Col>
                <Col span={3}></Col>
            </>
        } else {
            content = <>
                <Col span={1}></Col>
                <Col span={17}>
                    <SelectGifts loading={this.state.loading} save={this.save} />
                </Col>
            </>
        }

        return (
            <Row id="first-step">
                <Col span={5} className="leftColumn d-flex flex-column align-items-center">
                    <img src={require("../../assets/images/logo-white.png")} />
                    <div className="d-flex flex-column justify-content-around align-items-center">
                        <div></div>
                        <div className={"step " + (this.state.page == 1 ? "active" : "")}> Tipo de Evento </div>
                        <div className={"step " + (this.state.page == 2 ? "active" : "")}> Personalização </div>
                        <div className={"step " + (this.state.page == 3 ? "active" : "")}> Escolher Lista </div>
                        <div></div>
                        <img src={require("../../assets/images/first-step-line.png")} />
                    </div>
                </Col>
                {content}
            </Row>
        )
    }
}
