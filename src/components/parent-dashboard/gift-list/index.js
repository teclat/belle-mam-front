import React, { Component } from 'react';
import "./style.scss";
import Product from '../../product';

export default class GiftListParent extends Component {
    render() {
        return (
            <div id="gifts-parent">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Lista de Presentes</h4>
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
                        SALVAR
                    </div>
                </div>
            </div>
        )
    }
}
