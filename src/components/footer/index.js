import React, { Component } from 'react';
import "./style.scss";

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer" class="container-fluid d-flex justify-content-around flex-row p-5">
                <img class="footer-logo align-self-center" src={require("../../assets/images/cha-bebe-logo.png")} />
                <div>
                    <p class="title">Sobre a gente</p>
                    <p class="text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad.” minim veniam, quis nostrud exercitation ullamco laboris nisi.
            </p>
                </div>
                <div>
                    <p class="title">Links</p>
                    <ul class="link-list text">
                        <li>Por que a Belle Mam</li>
                        <li>Como funciona</li>
                        <li>Crie sua lista agora</li>
                        <li>Parceiros</li>
                        <li>Loja Belle Mam</li>
                    </ul>
                </div>
                <div>
                    <p class="title">Siga a Belle Mam</p>
                    <div>
                        <ul class="social-list d-flex">
                            <a target="_blank" href="https://instagram.com/soubellemam?igshid=ignx341ykuzm">
                                <li class="d-flex justify-content-center align-items-center mr-3">
                                    <img src={require("../../assets/images/instagram.png")} />
                                </li>
                            </a>
                            <li class="d-flex justify-content-center align-items-center">
                                <img src={require("../../assets/images/facebook.png")} />
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}
