import React, { Component } from 'react';
import "./style.scss";
import { Row, Col, Switch, Select } from 'antd';

const { Option } = Select;

export default class Product extends Component {
    render() {
        return (
            <li id="product" class="d-flex flex-column justify-content-around align-items-center">
                <img src={require("../../assets/images/colar.png")} />
                <p class="text">Colar de Âmbar Fecho Rosca</p>
                <p class="money">R$ 29</p>
                <Row justify="space-around">
                    <Col span={12}>
                        <p>ESCOLHER</p>
                        <Switch />
                    </Col>
                    <Col span={12}>
                        <p>QUANTIDADE</p>
                        <Select defaultValue="1">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </Col>
                </Row>
            </li>
        )
    }
}
