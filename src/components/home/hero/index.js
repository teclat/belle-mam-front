import React, { Component } from 'react';
import "./style.scss";

export default class Hero extends Component {

    state = {
        isTop: true,
    };

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop })
            }
        });
    }

    render() {
        return (
            <section id="hero" class="container-fluid d-flex align-items-center">
                <div class="hero-box">
                    <h1 class="h1">Faça o seu chá de bebê</h1>
                    <p class="mt-4 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut
                    labore et
                    dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                lacus vel facilisis. </p>
                    <button class="btn btn-secondary">CRIE SUA LISTA AGORA!</button>
                </div>
                <div class={"chat-btn d-flex justify-content-center align-items-center " + (this.state.isTop ? '' : 'scrolled')}>
                    <img src={require("../../../assets/images/chat.png")} />
                </div>
            </section>
        );
    }
}
