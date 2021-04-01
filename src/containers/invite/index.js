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
                {
                    this.state.event && this.state.event.products && this.state.event.products.length > 0 ?
                        <GiftList event={this.state.event} /> : null
                }
                {
                    this.state.event && this.state.event.gallery && this.state.event.gallery.length > 0 ?
                        <Gallery event={this.state.event} /> : null
                }
                {
                    this.state.event && this.state.event.notes && this.state.event.notes.length > 0 ?
                        <Notes event={this.state.event} /> : null
                }
                <Footer />
            </div>
        )
    }
}
