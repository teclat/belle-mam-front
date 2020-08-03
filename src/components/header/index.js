import React, { Component } from 'react';
import "./styles.scss";

export default class Header extends Component {
    render() {
        return (
            <header id="header" class="container-fluid d-flex justify-content-between align-items-center">
                <img class="header-logo" src={require("../../assets/images/logo-white.png")} />
                <ul class="d-flex align-items-center">
                    <li>
                        <p>PORQUE A BELLE MAN</p>
                    </li>
                    <li>
                        <p>COMO FUNCIONA</p>
                    </li>
                    <li>
                        <p>PARCEIROS</p>
                    </li>
                    <li>
                        <p>NOSSAS LISTAS</p>
                    </li>
                    <li class="menu-btn">
                        <button class="btn btn-outline">ENTRAR</button>
                    </li>
                    <li class="menu-btn">
                        <button class="btn btn-primary d-flex align-items-center">
                            LOJA BELLE MAN <img src={require("../../assets/images/enter.png")} />
                        </button>
                    </li>
                </ul>
            </header>
        );
    }
}
