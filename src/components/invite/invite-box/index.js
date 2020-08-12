import React, { Component } from 'react';
import "./style.scss";
import { Input, Button, Modal } from 'antd';
import { Constants } from '../../../constants';
import axios from "axios";
export default class InviteBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            note: '',
            showSendNote: false
        }
    }

    showSendNote = () => {
        this.setState({
            showSendNote: true,
        });
    }

    send = async e => {
        if (this.state.note == "") {
            Modal.warning({
                content: 'Recado está vazio.',
            });
            return;
        }

        let user = JSON.parse(await localStorage.getItem("user"));
        this.setState({ loading: true });

        axios.post(Constants.ApiUrl + 'notes/create', {
            user_id: user.id, event_id: this.props.event.id, text: this.state.note
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({ loading: false, note: '', showSendNote: false });
                Modal.success({
                    content: 'Recado enviado!',
                });
            })
            .catch((error) => {
                this.setState({ loading: false, note: '', showSendNote: false });
                Modal.error({
                    content: 'Erro de enviar recado.',
                });
                console.log(error);
            })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showSendNote: false,
        });
    };

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
                            <button
                                onClick={() => this.showSendNote()}
                                class={"btn " + (this.props.color == "green" ? 'btn-secondary' : 'btn-primary')} style={{ marginTop: 20, padding: 15 }}>
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
                <Modal
                    id="note-modal"
                    title="Enviar Recado"
                    visible={this.state.showSendNote}
                    onOk={this.send}
                    okText={'Enviar'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.send}>
                            Enviar
                        </Button>,
                    ]}
                >
                    <Input.TextArea
                        value={this.state.note}
                        onChange={(e) => this.setState({ note: e.target.value })}
                    />
                </Modal>
            </section>
        );
    }
}
