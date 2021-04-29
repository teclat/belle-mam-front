import React, { Component } from "react";
import "./style.scss";

export default class Benefits extends Component {
  render() {
    return (
      <section id="benefits" class="container-fluid">
        <div className="header-title-container">
          <h2 class="text-center h2">
            Prático, personalizado e seguro. Isso é a{" "}
            <span>Lista de Presentes da Belle Mam.</span>
          </h2>
        </div>
        <div>
          <ul class="d-flex justify-content-around">
            <li class="benefit-box left">
              <img
                src={require("../../../assets/images/paint-brush.png")}
                alt=""
              />
              <div>
                <p class="title">Personalize</p>
                <p class="text">
                  Inclua suas fotos, escolha suas cores favoritas e deixe o site
                  com a sua cara!
                </p>
              </div>
            </li>
            <li class="benefit-box right">
              <img src={require("../../../assets/images/lock.png")} alt="" />
              <div>
                <p class="title">Seguro</p>
                <p class="text">
                  Nossa plataforma é 100% segura! Fique tranquilo que todos os
                  dados (inclusive os de pagamento) estarão sempre em segurança{" "}
                </p>
              </div>
            </li>
          </ul>
          <ul class="d-flex justify-content-around">
            <li class="benefit-box left">
              <img src={require("../../../assets/images/gift.png")} alt="" />
              <div>
                <p class="title">Reverta em produtos ou dinheiro na conta</p>
                <p class="text">
                  Você pode converter o dinheiro arrecadado em produtos Belle
                  Mam ou receber ele em sua conta bancária!{" "}
                </p>
              </div>
            </li>
            <li class="benefit-box right">
              <img
                src={require("../../../assets/images/speech-bubble.png")}
                alt=""
              />
              <div>
                <p class="title">Mais interação com seus convidados</p>
                <p class="text">
                  Permita que seus convidados deixem recados para você no seu
                  próprio site, que eles confiem sua presença no evento, sejam
                  lembrados de sua data e muito mais!{" "}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
