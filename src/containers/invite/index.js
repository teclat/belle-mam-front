import React, { Component } from 'react'
import "./style.scss";
import Footer from '../../components/footer';
import Header from '../../components/header';
import InviteBox from '../../components/invite/invite-box';
import GiftList from '../../components/invite/gift-list';
import Gallery from '../../components/invite/gallery';
import Notes from '../../components/invite/notes';

export default class Invite extends Component {

    state = {
        color: "green"
    }

    render() {
        return (
            <div>
                <Header />
                <InviteBox color={this.state.color} />
                <GiftList color={this.state.color} />
                <Gallery color={this.state.color} />
                <Notes color={this.state.color} />
                <Footer color={this.state.color} />
            </div>
        )
    }
}
