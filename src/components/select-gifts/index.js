import React, { Component } from 'react'
import "./style.scss";
import Product from '../product';
import { Constants } from '../../constants';
import axios from "axios";
import { Button } from 'antd';
export default class SelectGifts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selecteds: []
        }
        this.get();
    }

    get = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));

        axios.get(Constants.ApiUrl + 'products', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                this.setState({
                    products: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    change = (id, values) => {
        console.log(values)
        let selecteds = this.state.selecteds;
        let exist = false;
        if (selecteds.length > 0) {
            let product = selecteds.filter(p => p.product_id == id)[0];
            if (product) {
                exist = true;
                if (values.selected == true) {
                    product.quantity = values.qtd;
                } else {
                    var index = selecteds.map(p => {
                        return p.product_id;
                    }).indexOf(id);
                    selecteds.splice(index, 1);
                }
            }
        }

        if (!exist) {
            if (values.selected == true) {
                selecteds.push({
                    product_id: id,
                    quantity: values.qtd
                })
            }
        }
        console.log("pppp", selecteds);
        this.setState({ selecteds: selecteds })
    }

    render() {
        return (
            <div id="select-gifts">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <div className="d-flex">
                        <h2>Falta pouco!</h2>
                        <img src={require("../../assets/images/purple-heart.png")} />
                    </div>
                    <h4>Vamos escolher os produtos do seu evento</h4>
                </div>
                <div className="gifts justify-content-center">
                    <ul class="d-flex flex-row justify-content-around">
                        {
                            this.state.products.map((product) => {
                                return <Product event_product={product.id} change={this.change}
                                    gifted={false} product={product} />
                            })
                        }
                    </ul>
                </div>
                <div className="d-flex btns justify-content-center">
                    <Button
                        loading={this.props.loading}
                        onClick={() => { this.props.save(this.state.selecteds) }} className="btn btn-secondary">
                        FINALIZAR
                    </Button>
                </div>
            </div>
        )
    }
}
