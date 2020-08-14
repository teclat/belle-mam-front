import React, { Component } from 'react'
import "./style.scss";
import { Card, Modal } from 'antd';
import { Constants } from '../../../constants';
import axios from "axios";

export default class EventsGuest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        this.get();
    }

    get = async () => {
        let user = JSON.parse(await localStorage.getItem("user"));
        this.setState({ loading: true });

        axios.post(Constants.ApiUrl + 'users/subscribed-events', {
            user_id: user.id
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((response) => {
                this.setState({ events: response.data, loading: false })
            })
            .catch((error) => {
                this.setState({ loading: false });
                Modal.error({
                    content: 'Erro de buscar eventos.',
                });
                console.log(error);
            })
    }

    render() {
        return (
            <div id="events-guest">
                <div className="d-flex flex-column justify-content-center align-items-center title-box">
                    <h4>Eventos</h4>
                </div>
                <div>
                    {this.state.events.length == 0 ?
                        <h3>Não participa de eventos ainda.</h3> : null
                    }
                    {this.state.events.map((event) => {
                        return <div key={event.id} className={'mb-3'}>
                            <Card>
                                <div className={'d-flex'}>
                                    <img src={event.event.baby_image_url} />
                                    <div>
                                        <h3>{event.event.baby_name}</h3>
                                        <p>{event.event.history_text}</p>
                                        <p>{event.event.address}</p>
                                        <p>{event.event.date}</p>
                                        <p>{event.event.hour}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    })

                    }

                </div>
            </div>
        )
    }
}
