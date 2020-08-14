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
            showParticipate: false,
            showSendNote: false,
        }
    }

    participate = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));
        this.setState({ loading: true });

        axios.post(Constants.ApiUrl + 'users/subscribe', {
            user_id: user.id, event_id: this.props.event.id
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({ loading: false, showParticipate: false });
                Modal.success({
                    content: 'Participação confirmada!',
                });
            })
            .catch((error) => {
                this.setState({ loading: false, showParticipate: false });
                Modal.error({
                    content: 'Erro de enviar recado.',
                });
                console.log(error);
            })
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
            <section id="invite" class={this.props.event.theme == "green" ? "invite-green" : "invite-purple"}>
                <div class="invite-back"></div>
                <div class="invite-box d-flex flex-row">
                    <div class="d-flex flex-column first-column align-items-center">
                        <div class="main-img d-flex justify-content-center align-items-center">
                            <img src={this.props.event.baby_image_url} />
                        </div>
                        <div style={{ paddingLeft: 30 }}>
                            <button class="btn btn-live">ASSISTA ONLINE</button>
                            <h3 class="subtitle">QUEM JÁ CONFIRMOU</h3>
                            <div class="d-flex flex-row flex-wrap confirmeds">
                                {
                                    this.props.event && this.props.event.guests ?
                                        this.props.event.guests.map((guest) => {
                                            return <img class="avatar" src={guest.image_url} />
                                        })
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column second-column">
                        <div class="d-flex flex-row align-items-center">
                            <div class="d-flex flex-row align-items-center">
                                <img class="avatar" src={this.props.event.mom_image_url} />
                                <div class="ml-2 mr-2">
                                    <p><span>A Mamãe</span></p>
                                    <p>{this.props.event.mom_name}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <img class="avatar" src={this.props.event.dad_image_url} />
                                <div class="ml-2 mr-2">
                                    <p><span>O Papai</span></p>
                                    <p>{this.props.event.dad_name}</p>
                                </div>
                            </div>
                        </div>
                        <h3 class="subtitle">CONVIDAM PARA O</h3>
                        <h1>Chá do {this.props.event.baby_name}</h1>
                        <p class="text">
                            {this.props.event.history_text}
                        </p>
                        <div class="d-flex flex-row">
                            <button onClick={() => this.setState({ showParticipate: true })} class={"btn " + (this.props.event.theme == "green" ? 'btn-secondary' : 'btn-primary')}>CONFIRME SUA PRESENÇA!</button>
                            <button class="btn btn-outline d-flex align-items-center justify-content-around">
                                <img src={require("../../../assets/images/" + (this.props.event.theme == "green" ? 'whats-green.png' : 'whats-purple.png'))} /> FALE COM OS PAPAIS
                    </button>
                        </div>
                        <div class="d-flex flex-row">
                            <button
                                onClick={() => this.showSendNote()}
                                class={"btn " + (this.props.event.theme == "green" ? 'btn-secondary' : 'btn-primary')} style={{ marginTop: 20, padding: 15 }}>
                                DEIXE SEU RECADO!
                            </button>
                        </div>
                    </div>
                    <div class="third-column">
                        <p class="subtitle">INFORMAÇÕES</p>
                        <div class="d-flex flex-row info align-items-center">
                            <img src={require("../../../assets/images/" + (this.props.event.theme == "green" ? 'location-green.png' : 'location-purple.png'))} />
                            <p>{this.props.event.address}</p>
                        </div>
                        <div class="d-flex flex-row info align-items-center">
                            <img src={require("../../../assets/images/" + (this.props.event.theme == "green" ? 'clock-green.png' : 'clock-purple.png'))} />
                            <p>{this.props.event.hour}h</p>
                        </div>
                        <div class="info-box d-flex flex-column justify-content-between align-items-center">
                            <div></div>
                            <div class="text-center">
                                <p>FALTAM</p>
                                <p><span>02</span></p>
                                <p>DIAS</p>
                            </div>
                            <button class={"btn " + (this.props.event.theme == "green" ? 'btn-secondary' : 'btn-primary')}>LEMBRETE</button>
                        </div>
                    </div>
                </div>
                <Modal
                    onCancel={() => this.setState({ showParticipate: false })}
                    title="Participar"
                    visible={this.state.showParticipate}
                    footer={[
                        <Button key="back" onClick={() => this.setState({
                            showParticipate: false,
                        })}>
                            Cancelar
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.participate}>
                            Participar
                        </Button>,
                    ]}
                >
                    <p>Você quer confirmar presença do evento?</p>
                </Modal>
                <Modal
                    id="note-modal"
                    title="Enviar Recado"
                    visible={this.state.showSendNote}
                    onOk={this.send}
                    okText={'Enviar'}
                    cancelText={'Cancelar'}
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
