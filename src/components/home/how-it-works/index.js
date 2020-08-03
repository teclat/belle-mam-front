import React, { Component } from 'react';
import "./style.scss";

export default class HowItWorks extends Component {
    render() {
        return (
            <section id="how-it-works" class="container-fluid">
                <h2 class="text-center h2 mb-5">Entenda como funciona a <span>Lista de Presentes</span> da Belle Mam</h2>
                <div class="">
                    <ul class="d-flex flex-column justify-content-around">
                        <li class="d-flex align-items-center">
                            <img src={require("../../../assets/images/website.png")} />
                            <p>Crie seu site junto com a lista de presentes online. Tudo personalizado e do seu jeito! Não vai
                        levar mais do que 5 minutinhos.</p>
                        </li>
                        <li class="d-flex align-self-end align-items-center">
                            <img src={require("../../../assets/images/share.png")} />
                            <p>Envie o convite virtual do seu evento e compartilha a lista com seus convidados!.</p>
                        </li>
                        <li class="d-flex align-items-center">
                            <img src={require("../../../assets/images/confirm.png")} />
                            <p>Tenha a confirmação de presença online e receba seus presentes em casa ou em dinheiro.</p>
                        </li>
                        <li class="d-flex align-self-end align-items-center">
                            <img src={require("../../../assets/images/baloon-2.png")} />
                            <p>Aproveite seu evento! E para garantir que você terá essa memória para sempre, você pode baixar a
                            página para seu computador e revê-la quantas vezes quiser.
                    </p>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}
