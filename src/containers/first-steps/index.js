import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Config from '../../components/config';
import Custom from '../../components/custom';
import "./style.scss";
import SelectGifts from '../../components/select-gifts';

export default class FirstStep extends Component {
    state = {
        page: 1
    }

    next = () => {
        this.setState({ page: this.state.page + 1 });
    }

    render() {
        let content = null;
        if (this.state.page == 1) {
            content = <>
                <Col span={3}></Col>
                <Col span={12}>
                    <Config next={() => this.next()} />
                </Col>
                <Col span={3}></Col>
            </>
        } else if (this.state.page == 2) {
            content = <>
                <Col span={3}></Col>
                <Col span={12}>
                    <Custom next={() => this.next()} />
                </Col>
                <Col span={3}></Col>
            </>
        } else {
            content = <>
                <Col span={1}></Col>
                <Col span={17}>
                    <SelectGifts next={() => this.next()} />
                </Col>
            </>
        }

        return (
            <Row id="first-step">
                <Col span={5} className="leftColumn d-flex flex-column align-items-center">
                    <img src={require("../../assets/images/logo-white.png")} />
                    <div className="d-flex flex-column justify-content-around align-items-center">
                        <div></div>
                        <div className="step active"> Tipo de Evento </div>
                        <div className="step"> Personalização </div>
                        <div className="step"> Escolher Lista </div>
                        <div></div>
                        <img src={require("../../assets/images/first-step-line.png")} />
                    </div>
                </Col>
                {content}
            </Row>
        )
    }
}
