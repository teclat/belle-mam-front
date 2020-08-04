import React, { Component } from 'react';
import "./style.scss";

export default class InviteBox extends Component {
    render() {
        return (
            <section id="invite" class={this.props.color == "green" ? "invite-green" : "invite-purple"}>
                <div class="invite-back"></div>
                <div class="invite-box d-flex flex-row">
                    <div class="d-flex flex-column first-column align-items-center">
                        <div class="main-img d-flex justify-content-center align-items-center">
                            <img src={require("../../../assets/images/baby.png")} />
                        </div>
                        <div style={{ paddingLeft: 30 }}>
                            <button class="btn btn-live">ASSISTA ONLINE</button>
                            <h3 class="subtitle">QUEM JÁ CONFIRMOU</h3>
                            <div class="d-flex flex-row flex-wrap confirmeds">
                                <img class="avatar" src={require("../../../assets/images/user-girls.png")} />
                                <img class="avatar" src={require("../../../assets/images/user-man.png")} />
                                <img class="avatar" src={require("../../../assets/images/user-girls.png")} />
                                <img class="avatar" src={require("../../../assets/images/user-man.png")} />
                                <img class="avatar" src={require("../../../assets/images/user-girls.png")} />
                                <img class="avatar" src={require("../../../assets/images/user-man.png")} />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column second-column">
                        <div class="d-flex flex-row align-items-center">
                            <div class="d-flex flex-row align-items-center">
                                <img class="avatar" src={require("../../../assets/images/user-girls.png")} />
                                <div class="ml-2 mr-2">
                                    <p><span>A Mamãe</span></p>
                                    <p>Fulana</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <img class="avatar" src={require("../../../assets/images/user-man.png")} />
                                <div class="ml-2 mr-2">
                                    <p><span>O Papai</span></p>
                                    <p>Fulano</p>
                                </div>
                            </div>
                        </div>
                        <h3 class="subtitle">CONVIDAM PARA O</h3>
                        <h1>Chá do Enzo</h1>
                        <p class="text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Quisv ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                            accumsan lacus vel facilisis.
                        </p>
                        <div class="d-flex flex-row">
                            <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>CONFIRME SUA PRESENÇA!</button>
                            <button class="btn btn-outline d-flex align-items-center justify-content-around">
                                <img src={require("../../../assets/images/" + (this.props.color == "green" ? 'whats-green.png' : 'whats-purple.png'))} /> FALE COM OS PAPAIS
                    </button>
                        </div>
                        <div class="d-flex flex-row">
                            <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')} style={{ marginTop: 20, padding: 15 }}>
                                DEIXE SEU RECADO!
                            </button>
                        </div>
                    </div>
                    <div class="third-column">
                        <p class="subtitle">INFORMAÇÕES</p>
                        <div class="d-flex flex-row info align-items-center">
                            <img src={require("../../../assets/images/" + (this.props.color == "green" ? 'location-green.png' : 'location-purple.png'))} />
                            <p>Rua José Cardoso, 99
                        Fortaleza - CE</p>
                        </div>
                        <div class="d-flex flex-row info align-items-center">
                            <img src={require("../../../assets/images/" + (this.props.color == "green" ? 'clock-green.png' : 'clock-purple.png'))} />
                            <p>13h</p>
                        </div>
                        <div class="info-box d-flex flex-column justify-content-between align-items-center">
                            <div></div>
                            <div class="text-center">
                                <p>FALTAM</p>
                                <p><span>02</span></p>
                                <p>DIAS</p>
                            </div>
                            <button class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')}>LEMBRETE</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
