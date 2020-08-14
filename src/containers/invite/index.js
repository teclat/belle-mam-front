import React, { Component } from 'react'
import "./style.scss";
import Footer from '../../components/footer';
import Header from '../../components/header';
import InviteBox from '../../components/invite/invite-box';
import GiftList from '../../components/invite/gift-list';
import Gallery from '../../components/invite/gallery';
import Notes from '../../components/invite/notes';
import { Constants } from '../../constants';
import axios from "axios";

export default class Invite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "green",
            event: {}
        }
        this.get();
    }

    get = async () => {
        axios.get(Constants.ApiUrl + 'events/event/' + this.props.match.params.url)
            .then((response) => {
                console.log(response.data)
                this.setState({ event: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <Header />
                <InviteBox event={this.state.event} />
                <GiftList event={this.state.event} />
                <Gallery event={this.state.event} />
                <Notes event={this.state.event} />
                <Footer />
            </div>
        )
    }
}
