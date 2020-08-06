import React, { Component } from 'react';
import "./style.scss";
import Product from '../../product';

export default class Products extends Component {
    render() {
        return (
            <div id="products">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Produtos</h4>
                </div>
                <div className="gifts justify-content-center">
                    <ul class="d-flex flex-row justify-content-around flex-wrap">
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                        <Product role={"admin"} />
                    </ul>
                </div>
            </div>
        );
    }
}
