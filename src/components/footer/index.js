import React, { Component } from "react";
import "./style.scss";

export default class Footer extends Component {
  render() {
    return (
      <footer
        id="footer"
        className="container-fluid d-flex justify-content-around flex-row"
      >
        <img
          className="footer-logo align-self-center"
          src={require("../../assets/images/cha-bebe-logo.png")}
          alt=""
        />
        <div>
          <p className="title">Sobre a gente</p>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad.” minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </p>
        </div>
        <div>
          <p className="title">Links</p>
          <ul className="link-list text">
            <li>Por que a Belle Mam</li>
            <li>Como funciona</li>
            <li>Crie sua lista agora</li>
            <li>Parceiros</li>
            <li>Loja Belle Mam</li>
          </ul>
        </div>
        <div>
          <p className="title">Siga a Belle Mam</p>
          <div>
            <ul className="social-list d-flex">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://instagram.com/soubellemam?igshid=ignx341ykuzm"
              >
                <li className="d-flex justify-content-center align-items-center mr-3">
                  <img
                    src={require("../../assets/images/instagram.png")}
                    alt=""
                  />
                </li>
              </a>
              <li className="d-flex justify-content-center align-items-center">
                <img src={require("../../assets/images/facebook.png")} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
