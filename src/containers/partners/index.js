import React, { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import "./style.scss";
import { Row } from 'antd';

export default class Partners extends Component {
    render() {
        return (
            <div id="partners">
                <Header purple={true} />
                <div className="partners-box d-flex flex-column align-items-center">
                    <div className="title text-center">
                        <h2 className="text-center">Conheça quem <span>acredita</span> <br />no nosso trabalho</h2>
                        <img src={require("../../assets/images/purple-heart.png")} />
                    </div>
                    <div className="box">
                        <Row justify="center">
                            <img src={require("../../assets/images/partners/medela.png")} />
                            <img src={require("../../assets/images/partners/club.png")} />
                            <img src={require("../../assets/images/partners/bebesecologicos.png")} />
                        </Row>
                        <Row justify="center">
                            <img src={require("../../assets/images/partners/rihappy.png")} />
                            <img src={require("../../assets/images/partners/prupe.png")} />
                            <img src={require("../../assets/images/partners/purachuva.png")} />
                        </Row>
                        <Row justify="center">
                            <img src={require("../../assets/images/partners/portbaby.png")} />
                            <img src={require("../../assets/images/partners/babytub.png")} />
                        </Row>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
