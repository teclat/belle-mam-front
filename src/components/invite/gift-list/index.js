import React, { Component } from 'react';
import "./style.scss";

export default class GiftList extends Component {
    render() {
        return (
            <section id="present-list" class={this.props.color == "green" ? "invite-green" : "invite-purple"}>
                <div class="d-flex justify-content-center align-items-center invite-title-box">
                    <h2>Lista de Presentes</h2>
                    <img src={require("../../../assets/images/white-heart.png")} />
                </div>
                <ul class="d-flex flex-row justify-content-around">
                    <li class="d-flex flex-column justify-content-around align-items-center">
                        <img src={require("../../../assets/images/colar.png")} />
                        <p class="text">Colar de Âmbar Fecho Rosca</p>
                        <p class="money">R$ 29</p>
                        <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>DAR PRESENTE!</button>
                    </li>
                    <li class="d-flex flex-column justify-content-around align-items-center">
                        <img src={require("../../../assets/images/colar.png")} />
                        <p class="text">Colar de Âmbar Fecho Rosca</p>
                        <p class="money">R$ 29</p>
                        <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>DAR PRESENTE!</button>
                    </li>
                    <li class="d-flex flex-column justify-content-around align-items-center">
                        <img src={require("../../../assets/images/colar.png")} />
                        <p class="text">Colar de Âmbar Fecho Rosca</p>
                        <p class="money">R$ 29</p>
                        <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>DAR PRESENTE!</button>
                    </li>
                    <li class="d-flex flex-column justify-content-around align-items-center">
                        <img src={require("../../../assets/images/colar.png")} />
                        <p class="text">Colar de Âmbar Fecho Rosca</p>
                        <p class="money">R$ 29</p>
                        <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>DAR PRESENTE!</button>
                    </li>
                </ul>
                <div class="d-flex flex-row justify-content-center">
                    <button class="btn btn-outline">VER MAIS</button>
                    <button class="btn btn-outline d-flex align-items-center justify-content-around">
                        <img src={require("../../../assets/images/whats.png")} /> FALAR COM A LOJA
            </button>
                </div>
            </section>
        );
    }
}
