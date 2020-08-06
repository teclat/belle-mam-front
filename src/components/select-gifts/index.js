import React, { Component } from 'react'
import "./style.scss";
import Product from '../product';

export default class SelectGifts extends Component {
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
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </ul>
                </div>
                <div className="d-flex btns justify-content-center">
                    <div className="btn btn-outline">
                        VER MAIS
                    </div>
                    <div className="btn btn-secondary">
                        FINALIZAR
                    </div>
                </div>
            </div>
        )
    }
}
