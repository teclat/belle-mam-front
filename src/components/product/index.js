import React, { Component } from 'react';
import "./style.scss";
import { Row, Col, Switch, Select } from 'antd';

const { Option } = Select;

export default class Product extends Component {

    state = {
        gifted: false,
        selected: this.props.selected,
        qtd: this.props.qtd ? this.props.qtd : 0
    }

    change = () => {
        this.props.change(this.props.event_product, this.state);
    }

    render() {
        return (
            <li id="product" class="d-flex flex-column justify-content-around align-items-center">
                <img src={this.props.product.image_url} />
                <p class="text">{this.props.product.name}</p>
                <p class="money">R$ {this.props.product.price}</p>
                {
                    this.props.gifted == false ?
                        (<Row justify="space-around">
                            <Col span={12}>
                                <p>ESCOLHER</p>
                                <Switch checked={this.state.selected}
                                    onChange={(e) => {
                                        this.setState({ selected: e }, () => {
                                            this.change()
                                        });
                                    }
                                    }
                                />
                            </Col>
                            <Col span={12}>
                                <p>QUANTIDADE</p>
                                <Select
                                    onChange={(e) => {
                                        this.setState({ qtd: e }, () => {
                                            this.change()
                                        })
                                    }}
                                    defaultValue={this.state.qtd}>
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={4}>4</Option>
                                    <Option value={5}>5</Option>
                                    <Option value={6}>6</Option>
                                    <Option value={7}>7</Option>
                                    <Option value={8}>8</Option>
                                    <Option value={9}>9</Option>
                                </Select>
                            </Col>
                        </Row>) : null
                }
            </li>
        )
    }
}
